from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import asc, desc
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/products", tags=["products"])

SORT_MAP = {
    "price-asc": asc(models.Product.price),
    "price-desc": desc(models.Product.price),
    "rating": desc(models.Product.rating),
    "name": asc(models.Product.name),
}


@router.get("", response_model=schemas.ProductListOut)
@router.get("/", response_model=schemas.ProductListOut)
def list_products(
    cat: Optional[str] = Query(None, description="Category id, or omit/'all' for everything"),
    q: Optional[str] = Query(None, description="Search term (matches name, brand, short description)"),
    sort: Optional[str] = Query(None, description="price-asc | price-desc | rating | name"),
    db: Session = Depends(get_db),
):

    query = db.query(models.Product)

    if cat and cat != "all":
        query = query.filter(models.Product.category_id == cat)

    if q:
        like = f"%{q.strip()}%"
        query = query.filter(
            (models.Product.name.ilike(like))
            | (models.Product.brand.ilike(like))
            | (models.Product.short.ilike(like))
        )

    if sort and sort in SORT_MAP:
        query = query.order_by(SORT_MAP[sort])

    items = query.all()
    return {"total": len(items), "items": items}


@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: str, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product
