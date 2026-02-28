from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from typing import List, Optional

from app.database import get_db
from app.models.task import Task, TaskStatus, TaskPriority
from app.schemas.task import TaskCreate, TaskUpdate
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.post("/")
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    new_task = Task(
        **task.model_dump(),
        user_id=user.id
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.get("/")
def get_tasks(
    status: Optional[TaskStatus] = None,
    priority: Optional[TaskPriority] = None,
    category_id: Optional[int] = None,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    query = (
        db.query(Task)
        .options(joinedload(Task.category))
        .filter(Task.user_id == user.id)
    )

    if status:
        query = query.filter(Task.status == status)

    if priority:
        query = query.filter(Task.priority == priority)

    if category_id:
        query = query.filter(Task.category_id == category_id)

    tasks = query.all()

    return [
        {
            "id": task.id,
            "title": task.title,
            "description": task.description,
            "status": task.status,
            "priority": task.priority,
            "due_date": task.due_date,
            "category_id": task.category_id,
            "category": (
                {
                    "id": task.category.id,
                    "name": task.category.name,
                }
                if task.category
                else None
            ),
        }
        for task in tasks
    ]


@router.put("/{task_id}")
def update_task(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    db_task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.user_id == user.id)
        .first()
    )

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    for key, value in task.model_dump(exclude_unset=True).items():
        setattr(db_task, key, value)

    db.commit()
    db.refresh(db_task)

    return db_task


@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    db_task = (
        db.query(Task)
        .filter(Task.id == task_id, Task.user_id == user.id)
        .first()
    )

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()

    return {"message": "Task deleted successfully"}
