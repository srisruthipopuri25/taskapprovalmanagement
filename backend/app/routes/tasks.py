from fastapi import APIRouter, Depends
from app.database import SessionLocal
from app.models.task import Task
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/tasks")

@router.post("/")
def create_task(task: dict, user=Depends(get_current_user)):
    db = SessionLocal()
    new_task = Task(**task, user_id=user.id)
    db.add(new_task)
    db.commit()
    return new_task

@router.get("/")
def get_tasks(user=Depends(get_current_user)):
    db = SessionLocal()
    return db.query(Task).filter(Task.user_id == user.id).all()
