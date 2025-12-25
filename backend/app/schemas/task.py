from pydantic import BaseModel
from datetime import date
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    priority: Optional[str] = None  
    due_date: Optional[date] = None
    status: Optional[str] = None
    category_id: Optional[int] = None

class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True
