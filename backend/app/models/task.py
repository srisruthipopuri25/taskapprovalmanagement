from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class StatusEnum(str, enum.Enum):
    pending = "Pending"
    progress = "In Progress"
    completed = "Completed"

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)
    title = Column(String(255))
    priority = Column(String(50))
    due_date = Column(Date)
    status = Column(Enum(StatusEnum))

    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))

    owner = relationship("User", back_populates="tasks")
    category = relationship("Category", back_populates="tasks")
