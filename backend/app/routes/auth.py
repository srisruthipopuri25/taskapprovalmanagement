from fastapi import APIRouter, Depends, HTTPException
from passlib.context import CryptContext
from app.database import SessionLocal
from app.models.user import User
from app.auth.jwt import create_access_token

router = APIRouter(prefix="/auth")
pwd = CryptContext(schemes=["bcrypt"])

@router.post("/register")
def register(email: str, password: str):
    db = SessionLocal()
    hashed = pwd.hash(password)
    user = User(email=email, hashed_password=hashed)
    db.add(user)
    db.commit()
    return {"message": "User created"}

@router.post("/login")
def login(email: str, password: str):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    if not user or not pwd.verify(password, user.hashed_password):
        raise HTTPException(status_code=401)
    token = create_access_token({"sub": user.id})
    return {"access_token": token}
