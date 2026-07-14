from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=schemas.ContactMessageOut, status_code=201)
@router.post("/", response_model=schemas.ContactMessageOut, status_code=201)
def submit_contact_message(payload: schemas.ContactMessageIn, db: Session = Depends(get_db)):

    msg = models.ContactMessage(
        full_name=payload.full_name,
        phone=payload.phone,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
    )
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
