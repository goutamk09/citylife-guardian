from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from .db import Base, engine
from .auth import router as auth_router
from .issues import router as issues_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

# ⭐ Serve images here
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(auth_router, prefix="/api/auth")
app.include_router(issues_router, prefix="/api/issues")

@app.get("/")
def root():
    return {"message": "Backend running successfully"}
