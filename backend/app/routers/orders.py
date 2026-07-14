import random
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/orders", tags=["orders"])

# Mirrors the constants hard-coded in checkout.html
DELIVERY_FEE = 300
FREE_DELIVERY_THRESHOLD = 3000


def _generate_order_no(db: Session) -> str:
    for _ in range(20):
        candidate = "TZ" + str(random.randint(100000, 999999))
        exists = db.query(models.Order).filter(models.Order.order_no == candidate).first()
        if not exists:
            return candidate
    raise HTTPException(status_code=500, detail="Could not generate a unique order number")


@router.post("", response_model=schemas.OrderOut, status_code=201)
@router.post("/", response_model=schemas.OrderOut, status_code=201)
def create_order(payload: schemas.OrderCreateIn, db: Session = Depends(get_db)):

    if not payload.items:
        raise HTTPException(status_code=400, detail="Order must contain at least one item")

    if payload.payment_method == "mpesa" and not payload.mpesa_phone:
        raise HTTPException(status_code=400, detail="M-Pesa phone number is required for M-Pesa payments")

    # Resolve products & validate stock
    product_ids = [i.product_id for i in payload.items]
    products = db.query(models.Product).filter(models.Product.id.in_(product_ids)).all()
    products_by_id = {p.id: p for p in products}

    missing = [pid for pid in product_ids if pid not in products_by_id]
    if missing:
        raise HTTPException(status_code=404, detail=f"Unknown product id(s): {', '.join(missing)}")

    order_items = []
    subtotal = 0
    needs_rx = False
    for line in payload.items:
        product = products_by_id[line.product_id]
        if product.stock < line.qty:
            raise HTTPException(
                status_code=400,
                detail=f'Not enough stock for "{product.name}" (requested {line.qty}, have {product.stock})',
            )
        line_total = product.price * line.qty
        subtotal += line_total
        needs_rx = needs_rx or product.rx
        order_items.append(
            models.OrderItem(
                product_id=product.id,
                product_name=product.name,
                unit_price=product.price,
                qty=line.qty,
                line_total=line_total,
            )
        )

    delivery_fee = 0 if subtotal >= FREE_DELIVERY_THRESHOLD else DELIVERY_FEE
    total = subtotal + delivery_fee

    order = models.Order(
        order_no=_generate_order_no(db),
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        address=payload.address,
        city=payload.city,
        area=payload.area,
        notes=payload.notes,
        payment_method=payload.payment_method,
        mpesa_phone=payload.mpesa_phone,
        needs_rx=needs_rx,
        rx_verified=False,
        subtotal=subtotal,
        delivery_fee=delivery_fee,
        total=total,
        status="pending",
        payment_status="paid" if payload.payment_method == "cod" else "pending",
        items=order_items,
    )
    db.add(order)

    # Decrement stock now that the order is confirmed created
    for line in payload.items:
        products_by_id[line.product_id].stock -= line.qty

    db.commit()
    db.refresh(order)
    return order


@router.get("/{order_no}", response_model=schemas.OrderOut)
def get_order(order_no: str, db: Session = Depends(get_db)):
    order = (
        db.query(models.Order)
        .options(joinedload(models.Order.items))
        .filter(models.Order.order_no == order_no)
        .first()
    )
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order
