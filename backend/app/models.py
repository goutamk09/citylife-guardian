# backend/app/models.py
from sqlalchemy import Column, Integer, String, Float, Boolean
from .db import Base

class Issue(Base):
    __tablename__ = "issues"
    id = Column(Integer, primary_key=True, index=True)
    description = Column(String)
    image_url = Column(String, nullable=True)

    status = Column(String, default="open")
    severity = Column(Integer, default=1)
    category = Column(String, default="Other")
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_admin = Column(Boolean, default=False)
    name = Column(String, nullable=True)

class Volunteer(Base):
    __tablename__ = "volunteers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    is_available = Column(Boolean, default=True)
    lat = Column(Float, nullable=True)
    lng = Column(Float, nullable=True)
