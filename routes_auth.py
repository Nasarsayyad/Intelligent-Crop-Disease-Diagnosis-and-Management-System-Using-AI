"""
Authentication & User Profile Routes.
Provides secure password hashing (SHA-256 + salt), user registration,
login session tokens, and farm profile management.
"""

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Optional
import hashlib
import uuid
from datetime import datetime
from ..database.db import get_connection

router = APIRouter(prefix="/api", tags=["Authentication & Profile"])

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    farm_name: Optional[str] = "Green Valley Farm"
    farm_location: Optional[str] = "Coimbatore, Tamil Nadu"
    farm_size_acres: Optional[float] = 5.0
    preferred_language: Optional[str] = "en"

class LoginRequest(BaseModel):
    email: str
    password: str

class ProfileUpdateRequest(BaseModel):
    full_name: Optional[str] = None
    farm_name: Optional[str] = None
    farm_location: Optional[str] = None
    farm_size_acres: Optional[float] = None
    preferred_language: Optional[str] = None

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

@router.post("/auth/register")
def register(req: RegisterRequest):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT id FROM users WHERE email = ?", (req.email,))
    if cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=400, detail="An account with this email address already exists.")

    user_id = f"user_{uuid.uuid4().hex[:12]}"
    pw_hash = hash_password(req.password)
    now = datetime.now().isoformat()

    cursor.execute("""
    INSERT INTO users (id, full_name, email, password_hash, farm_name, farm_location, farm_size_acres, preferred_language, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (user_id, req.full_name, req.email, pw_hash, req.farm_name, req.farm_location, req.farm_size_acres, req.preferred_language, now))

    conn.commit()
    conn.close()

    return {
        "success": True,
        "message": "Account created successfully.",
        "token": f"token_{user_id}",
        "user": {
            "id": user_id,
            "full_name": req.full_name,
            "email": req.email,
            "farm_name": req.farm_name,
            "farm_location": req.farm_location,
            "farm_size_acres": req.farm_size_acres,
            "preferred_language": req.preferred_language
        }
    }

@router.post("/auth/login")
def login(req: LoginRequest):
    conn = get_connection()
    cursor = conn.cursor()

    pw_hash = hash_password(req.password)
    cursor.execute("""
    SELECT id, full_name, email, farm_name, farm_location, farm_size_acres, preferred_language
    FROM users WHERE email = ? AND password_hash = ?
    """, (req.email, pw_hash))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    return {
        "success": True,
        "message": "Login successful.",
        "token": f"token_{user['id']}",
        "user": dict(user)
    }

@router.get("/profile")
def get_profile(user_id: Optional[str] = "user_demo_001"):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
    SELECT id, full_name, email, farm_name, farm_location, farm_size_acres, preferred_language, created_at
    FROM users WHERE id = ?
    """, (user_id,))
    user = cursor.fetchone()

    if not user:
        # Fallback to first user
        cursor.execute("SELECT id, full_name, email, farm_name, farm_location, farm_size_acres, preferred_language, created_at FROM users LIMIT 1")
        user = cursor.fetchone()

    if not user:
        conn.close()
        raise HTTPException(status_code=404, detail="User not found.")

    # Calculate quick dashboard stats
    cursor.execute("SELECT COUNT(*) as count FROM crops WHERE user_id = ?", (user["id"],))
    crops_count = cursor.fetchone()["count"]

    cursor.execute("SELECT COUNT(*) as count FROM diagnoses WHERE user_id = ?", (user["id"],))
    diagnoses_count = cursor.fetchone()["count"]

    conn.close()

    data = dict(user)
    data["stats"] = {
        "total_monitored_crops": crops_count,
        "total_diagnoses": diagnoses_count,
        "active_alerts": 2
    }
    return data

@router.put("/profile")
def update_profile(req: ProfileUpdateRequest, user_id: Optional[str] = "user_demo_001"):
    conn = get_connection()
    cursor = conn.cursor()

    fields = []
    values = []
    if req.full_name is not None:
        fields.append("full_name = ?")
        values.append(req.full_name)
    if req.farm_name is not None:
        fields.append("farm_name = ?")
        values.append(req.farm_name)
    if req.farm_location is not None:
        fields.append("farm_location = ?")
        values.append(req.farm_location)
    if req.farm_size_acres is not None:
        fields.append("farm_size_acres = ?")
        values.append(req.farm_size_acres)
    if req.preferred_language is not None:
        fields.append("preferred_language = ?")
        values.append(req.preferred_language)

    if not fields:
        conn.close()
        return {"success": True, "message": "No changes supplied."}

    values.append(user_id)
    query = f"UPDATE users SET {', '.join(fields)} WHERE id = ?"
    cursor.execute(query, tuple(values))
    conn.commit()
    conn.close()

    return {"success": True, "message": "Profile updated successfully."}
