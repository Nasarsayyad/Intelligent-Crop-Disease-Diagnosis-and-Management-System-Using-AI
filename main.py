"""
Main FastAPI Application Entry Point.
Intelligent Crop Disease Diagnosis and Management System Using AI.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
import os

from .database.db import init_db
from .routes import auth, diagnosis, weather, crops, chat, knowledge

app = FastAPI(
    title="Intelligent Crop Disease Diagnosis and Management System Using AI",
    description="Commercial-grade AI Agriculture Platform for crop identification, disease classification, growth stage estimation, and agronomic management.",
    version="2.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure static directories exist
STATIC_DIR = Path(__file__).resolve().parent.parent / "static"
UPLOADS_DIR = STATIC_DIR / "uploads"
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)

# Mount static files for uploaded and annotated images
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

# Include Routers
app.include_router(auth.router)
app.include_router(diagnosis.router)
app.include_router(weather.router)
app.include_router(crops.router)
app.include_router(chat.router)
app.include_router(knowledge.router)

@app.on_event("startup")
def on_startup():
    init_db()
    print("🌾 Intelligent Crop Disease Diagnosis System backend initialized successfully.")

@app.get("/")
def root():
    return {
        "system": "Intelligent Crop Disease Diagnosis and Management System Using AI",
        "status": "Operational",
        "version": "2.0.0",
        "docs_url": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "SQLite (WAL Mode)",
        "ai_engine": "Multi-Task Feature CNN + OpenCV Masking",
        "supported_crops": ["Tomato", "Potato", "Rice", "Corn (Maize)", "Apple", "Grape"]
    }
