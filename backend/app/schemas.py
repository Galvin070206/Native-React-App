from pydantic import BaseModel


class SavingCreate(BaseModel):
    month: str
    income: float
    expenses: float


class SavingResponse(SavingCreate):
    id: int
    savings: float

    # Pydantic v2: allow loading from ORM objects using attribute access
    model_config = {"from_attributes": True}
