from fastapi import FastAPI
from app.database import Base, engine

# IMPORTANT: import models BEFORE create_all
from app.models.user import User
from app.models.task import Task
from app.models.category import Category

from app.routes import auth, tasks, categories

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(tasks.router)
app.include_router(categories.router)
