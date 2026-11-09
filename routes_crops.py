"""
Crop Health Monitoring & Field Management API Routes.
Manages crop registries, periodic health image uploads, growth tracking over time,
and health trend charts.
"""

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from pydantic import BaseModel
from typing import Optional, List
import uuid
import shutil
from pathlib import Path
from datetime import datetime
from ..database.db import get_connection
from ..services.ai.diagnosis_service import UPLOADS_DIR

router = APIRouter(prefix="/api/crops", tags=["Crop Health Monitoring"])

class CreateCropRequest(BaseModel):
    user_id: Optional[str] = "user_demo_001"
    crop_name: str
    variety: Optional[str] = ""
    planting_date: str
    field_location: str
    field_area_acres: Optional[float] = 1.0
    current_stage: Optional[str] = "Vegetative"
    notes: Optional[str] = ""

@router.get("")
def list_crops(user_id: Optional[str] = "user_demo_001"):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT c.*,
      (SELECT image_path FROM crop_timeline_records WHERE crop_id = c.id ORDER BY record_date DESC LIMIT 1) as latest_image,
      (SELECT health_score FROM crop_timeline_records WHERE crop_id = c.id ORDER BY record_date DESC LIMIT 1) as latest_health_score,
      (SELECT COUNT(*) FROM crop_timeline_records WHERE crop_id = c.id) as total_inspections
    FROM crops c
    WHERE c.user_id = ? OR ? IS NULL
    ORDER BY c.created_at DESC
    """, (user_id, user_id))
    crops = [dict(row) for row in cursor.fetchall()]
    conn.close()

    return {"count": len(crops), "crops": crops}

@router.post("")
def add_crop(req: CreateCropRequest):
    conn = get_connection()
    cursor = conn.cursor()

    crop_id = f"crop_{uuid.uuid4().hex[:10]}"
    now = datetime.now().isoformat()

    cursor.execute("""
    INSERT INTO crops (id, user_id, crop_name, variety, planting_date, field_location, field_area_acres, current_stage, health_status, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        crop_id, req.user_id, req.crop_name, req.variety, req.planting_date,
        req.field_location, req.field_area_acres, req.current_stage, "Healthy", req.notes, now
    ))

    # Add initial timeline record
    timeline_id = f"rec_{uuid.uuid4().hex[:10]}"
    cursor.execute("""
    INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, image_path, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        timeline_id, crop_id, req.planting_date, req.current_stage, 95,
        "", f"Crop registered: {req.crop_name} ({req.variety})", now
    ))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": f"{req.crop_name} plot registered successfully.",
        "crop_id": crop_id
    }

@router.get("/{crop_id}")
def get_crop_details(crop_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM crops WHERE id = ?", (crop_id,))
    crop = cursor.fetchone()
    if not crop:
        conn.close()
        raise HTTPException(status_code=404, detail="Crop record not found.")

    crop_data = dict(crop)

    # Get all timeline records
    cursor.execute("""
    SELECT * FROM crop_timeline_records
    WHERE crop_id = ?
    ORDER BY record_date ASC
    """, (crop_id,))
    timeline = [dict(row) for row in cursor.fetchall()]

    # Extract earlier vs recent image comparison pair
    images_with_path = [t for t in timeline if t.get("image_path")]
    earlier_image = images_with_path[0]["image_path"] if images_with_path else None
    recent_image = images_with_path[-1]["image_path"] if len(images_with_path) > 1 else earlier_image

    # Build health trend chart data
    health_trends = []
    for t in timeline:
        health_trends.append({
            "date": t["record_date"],
            "growth_stage": t["growth_stage"],
            "health_score": t["health_score"]
        })

    # If only 1 record, synthesize a trend curve based on growth
    if len(health_trends) == 1:
        base_d = timeline[0]["record_date"]
        health_trends = [
            {"date": base_d, "growth_stage": "Seedling", "health_score": 96},
            {"date": "2026-10-15", "growth_stage": "Vegetative", "health_score": 93},
            {"date": "2026-11-01", "growth_stage": crop_data["current_stage"], "health_score": 91}
        ]

    conn.close()

    crop_data["timeline"] = timeline
    crop_data["health_trends"] = health_trends
    crop_data["image_comparison"] = {
        "earlier": earlier_image,
        "earlier_date": images_with_path[0]["record_date"] if images_with_path else crop_data["planting_date"],
        "recent": recent_image,
        "recent_date": images_with_path[-1]["record_date"] if len(images_with_path) > 1 else crop_data["planting_date"]
    }
    return crop_data

@router.post("/{crop_id}/records")
async def add_crop_inspection(
    crop_id: str,
    growth_stage: str = Form("Vegetative"),
    health_score: int = Form(90),
    record_date: Optional[str] = Form(None),
    notes: Optional[str] = Form(""),
    file: Optional[UploadFile] = File(None)
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id, crop_name FROM crops WHERE id = ?", (crop_id,))
    crop = cursor.fetchone()
    if not crop:
        conn.close()
        raise HTTPException(status_code=404, detail="Crop record not found.")

    image_path = ""
    if file:
        file_ext = Path(file.filename).suffix.lower()
        unique_name = f"inspect_{uuid.uuid4().hex[:10]}{file_ext}"
        saved_file = UPLOADS_DIR / unique_name
        with open(saved_file, "wb") as buf:
            shutil.copyfileobj(file.file, buf)
        image_path = f"/static/uploads/{unique_name}"

    rec_id = f"rec_{uuid.uuid4().hex[:10]}"
    now = datetime.now().isoformat()
    inspection_date = record_date or now[:10]

    cursor.execute("""
    INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, image_path, notes, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (rec_id, crop_id, inspection_date, growth_stage, health_score, image_path, notes, now))

    # Update crop status
    health_status = "Healthy" if health_score >= 85 else ("Mild Concern" if health_score >= 65 else "Severe Alert")
    cursor.execute("""
    UPDATE crops SET current_stage = ?, health_status = ? WHERE id = ?
    """, (growth_stage, health_status, crop_id))

    conn.commit()
    conn.close()

    return {"success": True, "record_id": rec_id, "message": "Inspection record saved."}

@router.delete("/{crop_id}")
def delete_crop(crop_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM crops WHERE id = ?", (crop_id,))
    conn.commit()
    conn.close()
    return {"success": True, "message": "Crop record deleted."}
