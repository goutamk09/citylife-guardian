# app/create_admin.py
from app.db import SessionLocal
from app.models import User
from app.auth import hash_password

db = SessionLocal()

email = "admin@example.com"
password = "admin123"

existing = db.query(User).filter(User.email == email).first()

if existing:
    print("Admin already exists:", existing.email)
else:
    admin = User(
        email=email,
        hashed_password=hash_password(password)
    )
    db.add(admin)
    db.commit()
    print("Admin created successfully!")
    print("Email:", email)
    print("Password:", password)
