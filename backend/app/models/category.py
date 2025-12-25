from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Integer, String, ForeignKey
from app.database import Base

class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)  # length for MySQL
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("users.id"), nullable=True)

    tasks: Mapped[list["Task"]] = relationship("Task", back_populates="category", cascade="all, delete")
