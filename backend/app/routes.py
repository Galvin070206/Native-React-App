from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .database import SessionLocal
from . import crud, schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/savings", response_model=schemas.SavingResponse)
def add_saving(data: schemas.SavingCreate, db: Session = Depends(get_db)):
    return crud.create_saving(db, data)


@router.get("/savings", response_model=list[schemas.SavingResponse])
def list_savings(db: Session = Depends(get_db)):
    return crud.get_savings(db)
