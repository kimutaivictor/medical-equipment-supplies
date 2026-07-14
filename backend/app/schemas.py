"""
TopZen Healthcare Limited — Pydantic schemas (API request/response contracts)
"""
import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, EmailStr, Field, ConfigDict


# ---------- Categories ----------
class CategoryOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    icon: str
    blurb: str


# ---------- Products ----------
class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    category: str = Field(validation_alias="category_id", serialization_alias="category")
    icon: Optional[str] = None
    price: int
    oldPrice: Optional[int] = Field(default=None, validation_alias="old_price", serialization_alias="oldPrice")
    rx: bool
    rating: float
    reviews: int
    stock: int
    sku: str
    brand: str
    short: str
    description: str
    features: List[str]
    badge: Optional[str] = None


class ProductListOut(BaseModel):
    total: int
    items: List[ProductOut]


# ---------- Orders ----------
class OrderItemIn(BaseModel):
    product_id: str
    qty: int = Field(gt=0)


class OrderCreateIn(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    address: str
    city: str
    area: Optional[str] = None
    notes: Optional[str] = None
    payment_method: Literal["mpesa", "card", "cod"]
    mpesa_phone: Optional[str] = None
    items: List[OrderItemIn]


class OrderItemOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    product_id: str
    product_name: str
    unit_price: int
    qty: int
    line_total: int


class OrderOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    order_no: str
    full_name: str
    phone: str
    email: str
    address: str
    city: str
    area: Optional[str] = None
    notes: Optional[str] = None
    payment_method: str
    mpesa_phone: Optional[str] = None
    needs_rx: bool
    rx_verified: bool
    subtotal: int
    delivery_fee: int
    total: int
    status: str
    payment_status: str
    created_at: datetime.datetime
    items: List[OrderItemOut]


# ---------- Contact ----------
class ContactMessageIn(BaseModel):
    full_name: str
    phone: str
    email: EmailStr
    subject: str
    message: str


class ContactMessageOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    subject: str
    created_at: datetime.datetime


# ---------- M-Pesa (simulated STK push) ----------
class MpesaStkIn(BaseModel):
    order_no: str
    phone: str


class MpesaStkOut(BaseModel):
    checkout_request_id: str
    status: Literal["pending"]
    message: str
