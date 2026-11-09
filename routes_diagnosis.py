"""
Crop Disease Diagnosis API Routes.
Provides image upload, modular AI prediction pipeline execution,
symptom visualization, diagnosis history retrieval, and report queries.
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Query
from typing import Optional
import shutil
import uuid
import json
from pathlib import Path
from datetime import datetime
from ..services.ai.diagnosis_service import diagnosis_service, UPLOADS_DIR
from ..database.db import get_connection

router = APIRouter(prefix="/api/diagnosis", tags=["AI Crop Diagnosis"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB

@router.post("/analyze")
async def analyze_crop_image(
    file: UploadFile = File(...),
    crop_hint: Optional[str] = Form(None),
    user_id: Optional[str] = Form("user_demo_001"),
    crop_id: Optional[str] = Form(None)
):
    # 1. Validate file extension
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format '{file_ext}'. Please upload JPG, JPEG, PNG, or WEBP image."
        )

    # 2. Save original image to static uploads directory
    unique_filename = f"{uuid.uuid4().hex[:12]}_{file.filename.replace(' ', '_')}"
    saved_path = UPLOADS_DIR / unique_filename

    try:
        with open(saved_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save uploaded file: {str(e)}")

    # Check file size
    if saved_path.stat().st_size > MAX_FILE_SIZE_BYTES:
        saved_path.unlink(missing_ok=True)
        raise HTTPException(status_code=400, detail="File size exceeds maximum permitted limit of 15 MB.")

    # 3. Invoke Modular AI Diagnosis Pipeline
    result = diagnosis_service.diagnose_crop(
        image_path=saved_path,
        original_filename=unique_filename,
        crop_hint=crop_hint
    )

    if not result.get("success"):
        return result

    # 4. Persist diagnosis record into database
    diag_id = f"diag_{uuid.uuid4().hex[:12]}"
    now = datetime.now().isoformat()

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    INSERT INTO diagnoses (
        id, user_id, crop_id, original_image_path, annotated_image_path,
        crop_name, crop_category, crop_confidence, growth_stage,
        disease_name, scientific_name, disease_description, disease_severity,
        disease_confidence, affected_area_percentage,
        symptoms_json, causes_json, treatments_json, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        diag_id,
        user_id,
        crop_id,
        result["visual_diagnosis"]["original_image_url"],
        result["visual_diagnosis"]["annotated_image_url"],
        result["crop"]["name"],
        result["crop"]["category"],
        result["crop"]["confidence"],
        result["growth_stage"]["estimated_stage"],
        result["disease"]["name"],
        result["disease"]["scientific_name"],
        result["disease"]["description"],
        result["disease"]["severity"],
        result["disease"]["confidence"],
        result["disease"]["affected_area_percentage"],
        json.dumps(result["disease"]["symptoms_detected"]),
        json.dumps(result["disease"]["possible_causes"]),
        json.dumps(result["treatment_and_management"]),
        now
    ))

    # Also update crop status if linked to monitored crop
    if crop_id:
        cursor.execute("""
        UPDATE crops SET current_stage = ?, health_status = ? WHERE id = ?
        """, (result["growth_stage"]["estimated_stage"], result["disease"]["severity"], crop_id))

        # Add timeline record
        timeline_id = f"rec_{uuid.uuid4().hex[:10]}"
        health_score = 100 if result["disease"]["severity"] == "Healthy" else (85 if result["disease"]["severity"] == "Mild" else (65 if result["disease"]["severity"] == "Moderate" else 40))
        cursor.execute("""
        INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, diagnosis_id, image_path, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            timeline_id, crop_id, now[:10], result["growth_stage"]["estimated_stage"],
            health_score, diag_id, result["visual_diagnosis"]["original_image_url"],
            f"AI Diagnosed: {result['disease']['name']} ({result['disease']['severity']})", now
        ))

    conn.commit()
    conn.close()

    result["diagnosis_id"] = diag_id
    result["created_at"] = now
    return result

@router.get("/history")
def get_diagnosis_history(
    user_id: Optional[str] = "user_demo_001",
    crop: Optional[str] = None,
    severity: Optional[str] = None,
    search: Optional[str] = None,
    sort: Optional[str] = "newest"
):
    conn = get_connection()
    cursor = conn.cursor()

    query = "SELECT * FROM diagnoses WHERE 1=1"
    params = []

    if user_id:
        query += " AND (user_id = ? OR user_id IS NULL)"
        params.append(user_id)

    if crop and crop.lower() != "all":
        query += " AND LOWER(crop_name) = LOWER(?)"
        params.append(crop)

    if severity and severity.lower() != "all":
        query += " AND LOWER(disease_severity) = LOWER(?)"
        params.append(severity)

    if search:
        query += " AND (LOWER(crop_name) LIKE ? OR LOWER(disease_name) LIKE ? OR LOWER(scientific_name) LIKE ?)"
        term = f"%{search.lower()}%"
        params.extend([term, term, term])

    if sort == "oldest":
        query += " ORDER BY created_at ASC"
    else:
        query += " ORDER BY created_at DESC"

    cursor.execute(query, tuple(params))
    rows = cursor.fetchall()
    conn.close()

    results = []
    for r in rows:
        results.append({
            "id": r["id"],
            "crop_name": r["crop_name"],
            "crop_category": r["crop_category"],
            "crop_confidence": r["crop_confidence"],
            "growth_stage": r["growth_stage"],
            "disease_name": r["disease_name"],
            "scientific_name": r["scientific_name"],
            "disease_description": r["disease_description"],
            "disease_severity": r["disease_severity"],
            "disease_confidence": r["disease_confidence"],
            "affected_area_percentage": r["affected_area_percentage"],
            "original_image_url": r["original_image_path"],
            "annotated_image_url": r["annotated_image_path"],
            "symptoms": json.loads(r["symptoms_json"]) if r["symptoms_json"] else [],
            "causes": json.loads(r["causes_json"]) if r["causes_json"] else [],
            "treatment_and_management": json.loads(r["treatments_json"]) if r["treatments_json"] else {},
            "created_at": r["created_at"]
        })

    return {"count": len(results), "records": results}

@router.get("/{diagnosis_id}")
def get_diagnosis_by_id(diagnosis_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM diagnoses WHERE id = ?", (diagnosis_id,))
    r = cursor.fetchone()
    conn.close()

    if not r:
        raise HTTPException(status_code=404, detail="Diagnosis report not found.")

    return {
        "id": r["id"],
        "crop_name": r["crop_name"],
        "crop_category": r["crop_category"],
        "crop_confidence": r["crop_confidence"],
        "growth_stage": r["growth_stage"],
        "disease_name": r["disease_name"],
        "scientific_name": r["scientific_name"],
        "disease_description": r["disease_description"],
        "disease_severity": r["disease_severity"],
        "disease_confidence": r["disease_confidence"],
        "affected_area_percentage": r["affected_area_percentage"],
        "original_image_url": r["original_image_path"],
        "annotated_image_url": r["annotated_image_path"],
        "symptoms": json.loads(r["symptoms_json"]) if r["symptoms_json"] else [],
        "causes": json.loads(r["causes_json"]) if r["causes_json"] else [],
        "treatment_and_management": json.loads(r["treatments_json"]) if r["treatments_json"] else {},
        "created_at": r["created_at"]
    }

@router.delete("/{diagnosis_id}")
def delete_diagnosis(diagnosis_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM diagnoses WHERE id = ?", (diagnosis_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Diagnosis record deleted."}
