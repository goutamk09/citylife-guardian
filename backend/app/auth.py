# backend/app/auth.py
from fastapi import APIRouter, HTTPException, Depends, Form
from .db import SessionLocal
from . import crud, models
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter()

SECRET_KEY = "replace_this_with_a_long_random_secret"  # change for production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# def verify_password(plain, hashed):
#     return pwd_context.verify(plain, hashed)

def get_password_hash(password):
    return pwd_context.hash(password)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

@router.post("/signup")
def signup(email: str = Form(...), password: str = Form(...), name: str = Form(None)):
    db = next(get_db())
    # check exists
    exists = db.query(models.User).filter(models.User.email == email).first()
    if exists:
        raise HTTPException(status_code=400, detail="Email exists")
    hashed = get_password_hash(password)
    user = models.User(email=email, hashed_password=hashed, name=name)
    db.add(user); db.commit(); db.refresh(user)
    return {"message": "created", "user_id": user.id}

@router.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    db = next(get_db())
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": str(user.id), "is_admin": user.is_admin})
    return {"access_token": token, "token_type": "bearer"}
