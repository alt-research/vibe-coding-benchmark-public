from datetime import datetime
from pydantic import BaseModel


class ItemBase(BaseModel):
    name: str
    description: str | None = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
