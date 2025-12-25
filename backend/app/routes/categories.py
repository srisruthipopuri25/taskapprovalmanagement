from fastapi import APIRouter, Depends, HTTPException
from app.database import SessionLocal
from app.models.category import Category
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/categories")


@router.post("/")
def create_category(category: dict, user=Depends(get_current_user)):
    db = SessionLocal()

    # optional: prevent duplicate category names per user
    existing = db.query(Category).filter(Category.name == category["name"]).first()
    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")

    new_category = Category(**category)
    db.add(new_category)
    db.commit()
    db.refresh(new_category)
    return new_category


@router.get("/")
def get_categories(user=Depends(get_current_user)):
    db = SessionLocal()
    return db.query(Category).all()


@router.delete("/{category_id}")
def delete_category(category_id: int, user=Depends(get_current_user)):
    db = SessionLocal()
    category = db.query(Category).filter(Category.id == category_id).first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(category)
    db.commit()
    return {"message": "Category deleted"}
