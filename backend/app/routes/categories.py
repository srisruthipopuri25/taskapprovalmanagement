from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.category import Category
from app.auth.dependencies import get_current_user

from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.category import Category
from app.auth.dependencies import get_current_user

router = APIRouter(prefix="/categories", tags=["Categories"])



@router.post("/", response_model=dict)
def create_category(
    name: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    # Prevent duplicate category names per user
    exists = db.query(Category).filter(
        Category.name == name,
        Category.user_id == user.id
    ).first()

    if exists:
        raise HTTPException(
            status_code=400,
            detail="Category already exists"
        )

    category = Category(
        name=name,
        user_id=user.id,
        is_predefined=False
    )

    db.add(category)
    db.commit()
    db.refresh(category)

    return {
        "id": category.id,
        "name": category.name,
        "is_predefined": category.is_predefined,
    }


@router.get("/", response_model=List[dict])
def get_categories(
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    categories = db.query(Category).filter(
        (Category.user_id == user.id) |
        (Category.is_predefined == True)
    ).order_by(Category.name.asc()).all()

    return [
        {
            "id": c.id,
            "name": c.name,
            "is_predefined": c.is_predefined,
        }
        for c in categories
    ]



@router.delete("/{category_id}")
def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    category = db.query(Category).filter(
        Category.id == category_id,
        Category.user_id == user.id
    ).first()

    if not category:
        raise HTTPException(
            status_code=404,
            detail="Category not found or not owned by user"
        )

    db.delete(category)
    db.commit()

    return {"message": "Category deleted"}

