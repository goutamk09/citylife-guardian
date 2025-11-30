# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models

def create_issue(db: Session, description: str, image_url: str, category: str = "Other", lat: float = None, lng: float = None, severity: int = 1, model_version: str = None):
    issue = models.Issue(description=description, image_url=image_url, category=category, lat=lat, lng=lng, severity=severity)
    if model_version:
        # optional: store model_version in a separate table or log - simple approach: ignore for now
        pass
    db.add(issue)
    db.commit()
    db.refresh(issue)
    return issue

def get_issues(db: Session):
    return db.query(models.Issue).order_by(models.Issue.id.desc()).all()

def get_issue(db: Session, issue_id: int):
    return db.query(models.Issue).filter(models.Issue.id == issue_id).first()

def update_issue_status(db: Session, issue_id: int, status: str):
    issue = get_issue(db, issue_id)
    if not issue:
        return None
    issue.status = status
    db.commit()
    db.refresh(issue)
    return issue

# volunteer helpers
def create_volunteer(db: Session, name: str, phone: str):
    from .models import Volunteer
    vol = Volunteer(name=name, phone=phone, is_available=True)
    db.add(vol)
    db.commit()
    db.refresh(vol)
    return vol

def update_volunteer_location(db: Session, volunteer_id: int, lat: float, lng: float):
    vol = db.query(models.Volunteer).filter(models.Volunteer.id == volunteer_id).first()
    if not vol:
        return None
    vol.lat = lat
    vol.lng = lng
    db.commit()
    db.refresh(vol)
    return vol

def get_available_volunteers(db: Session, bbox=None):
    # returns all available volunteers (simple)
    return db.query(models.Volunteer).filter(models.Volunteer.is_available == True).all()
