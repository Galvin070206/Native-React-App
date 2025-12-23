from sqlalchemy import Column, Integer, Float, String
from .database import Base


class Saving(Base):
    __tablename__ = "savings"

    id = Column(Integer, primary_key=True, index=True)
    month = Column(String, index=True)
    income = Column(Float)
    expenses = Column(Float)
    savings = Column(Float)
