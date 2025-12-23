from sqlalchemy.orm import Session
from .models import Saving
from .schemas import SavingCreate


def create_saving(db: Session, data: SavingCreate):
    savings_amount = data.income - data.expenses
    saving = Saving(
        month=data.month,
        income=data.income,
        expenses=data.expenses,
        savings=savings_amount
    )
    db.add(saving)
    db.commit()
    db.refresh(saving)
    return saving


def get_savings(db: Session):
    return db.query(Saving).all()
