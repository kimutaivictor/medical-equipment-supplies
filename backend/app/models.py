"""
TopZen Healthcare Limited — ORM models
These mirror the shapes already used by the frontend
(js/data.js TZ_CATEGORIES / TZ_PRODUCTS, and the fields collected
by checkout.html / contact.html) so the API is a drop-in replacement.
"""
import datetime
from sqlalchemy import (
    Column, String, Integer, Float, Boolean, Text, ForeignKey, DateTime, JSON
)
from sqlalchemy.orm import relationship
from .database import Base


class Category(Base):
    __tablename__ = "categories"

    id = Column(String, primary_key=True)          # e.g. "equipment"
    name = Column(String, nullable=False)           # "Medical Equipment"
    icon = Column(String, nullable=False)           # icon key, e.g. "stethoscope"
    blurb = Column(String, nullable=False)

    products = relationship("Product", back_populates="category")


class Product(Base):
    __tablename__ = "products"

    id = Column(String, primary_key=True)            # e.g. "p001"
    name = Column(String, nullable=False)
    category_id = Column(String, ForeignKey("categories.id"), nullable=False)
    icon = Column(String, nullable=True)              # per-product icon override (e.g. "bpMonitor")
    price = Column(Integer, nullable=False)           # KSh, whole units (matches frontend)
    old_price = Column(Integer, nullable=True)
    rx = Column(Boolean, default=False)                # prescription required
    rating = Column(Float, default=0)
    reviews = Column(Integer, default=0)
    stock = Column(Integer, default=0)
    sku = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    short = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    features = Column(JSON, default=list)              # list[str]
    badge = Column(String, nullable=True)               # "sale" | "new" | None

    category = relationship("Category", back_populates="products")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_no = Column(String, unique=True, index=True, nullable=False)   # e.g. "TZ482913"

    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    area = Column(String, nullable=True)
    notes = Column(Text, nullable=True)

    payment_method = Column(String, nullable=False)     # mpesa | card | cod
    mpesa_phone = Column(String, nullable=True)

    needs_rx = Column(Boolean, default=False)
    rx_verified = Column(Boolean, default=False)

    subtotal = Column(Integer, nullable=False)
    delivery_fee = Column(Integer, nullable=False)
    total = Column(Integer, nullable=False)

    status = Column(String, default="pending")  # pending | confirmed | dispatched | delivered | cancelled
    payment_status = Column(String, default="pending")  # pending | paid | failed

    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    items = relationship("OrderItem", back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    product_id = Column(String, ForeignKey("products.id"), nullable=False)

    # Snapshot fields so historic orders stay correct even if the product changes later
    product_name = Column(String, nullable=False)
    unit_price = Column(Integer, nullable=False)
    qty = Column(Integer, nullable=False)
    line_total = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, autoincrement=True)
    full_name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
