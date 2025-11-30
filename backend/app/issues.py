# backend/app/issues.py
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from .db import SessionLocal
from .crud import create_issue, get_issues, get_issue, update_issue_status, create_volunteer, update_volunteer_location, get_available_volunteers
from .ai_model import classify_image
import os, shutil
from fastapi import Depends
from fastapi import APIRouter
from sqlalchemy.orm import Session
from .database import get_db
from .models import Issue
import uuid




router = APIRouter()
UPLOAD_DIR = "app/static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_issue(
    description: str = Form(...),
    category: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...),
    image: UploadFile = File(None),
    db: Session = Depends(get_db)
):
    filename = None

    # Save image if uploaded
    if image:
        ext = image.filename.lower().split(".")[-1]
        if ext not in ("jpg", "jpeg", "png", "avif", "webp"):
            raise HTTPException(status_code=400, detail="Invalid image format")

        filename = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join("app/static/images", filename)

        with open(file_path, "wb") as f:
            f.write(await image.read())

    new_issue = Issue(
        description=description,
        category=category,
        lat=lat,
        lng=lng,
        image_url=f"/static/images/{filename}" if filename else None
    )

    db.add(new_issue)
    db.commit()
    db.refresh(new_issue)

    return {"id": new_issue.id}   # ✅ IMPORTANT


@router.get("/all")
def get_all_issues():
    db = next(get_db())
    return get_issues(db)

# quick classify endpoint (no save)
@router.post("/classify")
def classify_endpoint(description: str = Form(None), filename: str = Form(None)):
    result = classify_image(description or "", filename or "")
    return result

# admin endpoints
@router.get("/admin/issues")
def admin_issues():
    db = next(get_db())
    return get_issues(db)

@router.patch("/admin/issues/{issue_id}/status")
def admin_update(issue_id: int, status: str = Form(...)):
    db = next(get_db())
    updated = update_issue_status(db, issue_id, status)
    if not updated:
        raise HTTPException(status_code=404, detail="Not found")
    return {"message": "updated", "issue": {"id": updated.id, "status": updated.status}}

# volunteers
@router.post("/volunteers/register")
def volunteer_register(name: str = Form(...), phone: str = Form(...)):
    db = next(get_db())
    vol = create_volunteer(db, name, phone)
    return {"message": "registered", "volunteer_id": vol.id}

@router.post("/volunteers/{vol_id}/location")
def volunteer_location(vol_id: int, lat: float = Form(...), lng: float = Form(...)):
    db = next(get_db())
    vol = update_volunteer_location(db, vol_id, lat, lng)
    if not vol:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return {"message": "location updated"}

@router.get("/volunteers/available")
def volunteers_available():
    db = next(get_db())
    return get_available_volunteers(db)

# add near bottom of issues.py

@router.get("/heatmap")
def heatmap():
    db = next(get_db())
    issues = get_issues(db)
    # aggregate by rounding lat/lng to 2 decimal places (approx ~1km)
    agg = {}
    for i in issues:
        if not i.lat or not i.lng:
            continue
        key = (round(i.lat, 2), round(i.lng, 2))
        agg[key] = agg.get(key, 0) + 1
    out = [{"lat": k[0], "lng": k[1], "score": v} for k, v in agg.items()]
    return out

@router.put("/update-status/{issue_id}")
def update_status(issue_id: int, status: str, db: Session = Depends(get_db)):
    issue = db.query(Issue).filter(Issue.id == issue_id).first()
    if not issue:
        return {"error": "Issue not found"}

    issue.status = status
    db.commit()
    return {"message": "Status updated"}

