"""
Simulated M-Pesa STK push.

This does NOT call Safaricom's real Daraja API — there are no live
merchant credentials configured. It mimics the shape of a real STK
push response so the frontend's "M-Pesa" payment option has something
real to call instead of a `setTimeout` fake in the browser.

To go live: register for Daraja (https://developer.safaricom.co.ke),
get a Consumer Key/Secret + Shortcode + Passkey, and replace the body
of `initiate_stk_push` with a real POST to
https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest.
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/payments/mpesa", tags=["payments"])


@router.post("/stkpush", response_model=schemas.MpesaStkOut)
@router.post("/stkpush/", response_model=schemas.MpesaStkOut)
def initiate_stk_push(payload: schemas.MpesaStkIn, db: Session = Depends(get_db)):

    order = db.query(models.Order).filter(models.Order.order_no == payload.order_no).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if order.payment_method != "mpesa":
        raise HTTPException(status_code=400, detail="Order was not placed with M-Pesa as the payment method")

    checkout_request_id = "ws_CO_" + uuid.uuid4().hex[:20]

    # Simulated: mark as paid immediately. A real integration would leave this
    # as "pending" and update it later via Safaricom's callback URL.
    order.payment_status = "paid"
    order.mpesa_phone = payload.phone or order.mpesa_phone
    db.commit()

    return schemas.MpesaStkOut(
        checkout_request_id=checkout_request_id,
        status="pending",
        message=f"STK push sent to {payload.phone}. Enter your M-Pesa PIN to complete payment for order {order.order_no}.",
    )
