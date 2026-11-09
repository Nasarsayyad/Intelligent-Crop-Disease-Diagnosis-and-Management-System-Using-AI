"""
Database connection and schema initialization using SQLite.
Supports full CRUD with persistent storage and WAL mode for high performance.
"""

import sqlite3
import os
import json
from pathlib import Path
from datetime import datetime

DB_PATH = Path(__file__).resolve().parent.parent.parent / "crop_system.db"

def get_connection():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode = WAL")
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Users Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        farm_name TEXT DEFAULT '',
        farm_location TEXT DEFAULT 'Coimbatore, Tamil Nadu',
        farm_size_acres REAL DEFAULT 5.0,
        preferred_language TEXT DEFAULT 'en',
        created_at TEXT NOT NULL
    );
    """)

    # Monitored Crops Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS crops (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        crop_name TEXT NOT NULL,
        variety TEXT DEFAULT '',
        planting_date TEXT NOT NULL,
        field_location TEXT NOT NULL,
        field_area_acres REAL DEFAULT 1.0,
        current_stage TEXT DEFAULT 'Vegetative',
        health_status TEXT DEFAULT 'Healthy',
        notes TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    );
    """)

    # Crop Periodic Health Records (for timeline monitoring)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS crop_timeline_records (
        id TEXT PRIMARY KEY,
        crop_id TEXT NOT NULL,
        record_date TEXT NOT NULL,
        growth_stage TEXT NOT NULL,
        health_score INTEGER NOT NULL,
        diagnosis_id TEXT,
        image_path TEXT,
        notes TEXT DEFAULT '',
        created_at TEXT NOT NULL,
        FOREIGN KEY (crop_id) REFERENCES crops (id) ON DELETE CASCADE
    );
    """)

    # Diagnoses History Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS diagnoses (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        crop_id TEXT,
        original_image_path TEXT NOT NULL,
        annotated_image_path TEXT,
        crop_name TEXT NOT NULL,
        crop_category TEXT NOT NULL,
        crop_confidence REAL NOT NULL,
        growth_stage TEXT NOT NULL,
        disease_name TEXT NOT NULL,
        scientific_name TEXT DEFAULT '',
        disease_description TEXT NOT NULL,
        disease_severity TEXT NOT NULL,
        disease_confidence REAL NOT NULL,
        affected_area_percentage REAL DEFAULT 0.0,
        symptoms_json TEXT NOT NULL,
        causes_json TEXT NOT NULL,
        treatments_json TEXT NOT NULL,
        created_at TEXT NOT NULL
    );
    """)

    # Chat Messages Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS chat_messages (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        sender TEXT NOT NULL,
        message TEXT NOT NULL,
        language TEXT DEFAULT 'en',
        created_at TEXT NOT NULL
    );
    """)

    # Notifications Table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'info',
        is_read INTEGER DEFAULT 0,
        created_at TEXT NOT NULL
    );
    """)

    # Seed demo user if none exists
    cursor.execute("SELECT COUNT(*) as count FROM users")
    row = cursor.fetchone()
    if row["count"] == 0:
        import hashlib
        demo_id = "user_demo_001"
        pw_hash = hashlib.sha256("farmer123".encode()).hexdigest()
        now = datetime.now().isoformat()
        cursor.execute("""
        INSERT INTO users (id, full_name, email, password_hash, farm_name, farm_location, farm_size_acres, preferred_language, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (demo_id, "Kavitha Raman", "farmer@agriai.com", pw_hash, "GreenFields Organic Farm", "Coimbatore, Tamil Nadu", 8.5, "en", now))

        # Seed initial notification
        cursor.execute("""
        INSERT INTO notifications (id, user_id, title, message, type, is_read, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            "notif_001",
            demo_id,
            "High Fungal Risk Alert",
            "High humidity (88%) and 28°C expected over the next 48h. Monitor tomato and potato plots for Early/Late Blight symptoms.",
            "warning",
            0,
            now
        ))

        # Seed sample monitored crop
        crop_id = "crop_demo_tomato_01"
        cursor.execute("""
        INSERT INTO crops (id, user_id, crop_name, variety, planting_date, field_location, field_area_acres, current_stage, health_status, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (crop_id, demo_id, "Tomato", "Arka Rakshak (F1 Hybrid)", "2026-09-15", "North Plot B-2", 2.5, "Flowering", "Healthy", "Drip irrigated, mulched with straw", now))

        # Seed initial timeline records
        cursor.execute("""
        INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, image_path, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, ("rec_01", crop_id, "2026-09-25", "Seedling", 95, "/static/uploads/sample_seedling.jpg", "Good germination, uniform emergence", "2026-09-25T10:00:00"))
        cursor.execute("""
        INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, image_path, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, ("rec_02", crop_id, "2026-10-15", "Vegetative", 92, "/static/uploads/sample_vegetative.jpg", "Strong canopy development, basal foliage healthy", "2026-10-15T11:00:00"))
        cursor.execute("""
        INSERT INTO crop_timeline_records (id, crop_id, record_date, growth_stage, health_score, image_path, notes, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, ("rec_03", crop_id, "2026-11-01", "Flowering", 94, "/static/uploads/sample_flowering.jpg", "Profuse flower cluster set, no pest infestation observed", "2026-11-01T09:30:00"))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully at", DB_PATH)
