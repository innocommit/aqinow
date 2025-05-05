from sqlmodel import SQLModel, Field
from sqlalchemy import BIGINT, TIMESTAMP, func

from datetime import datetime


class BaseModel(SQLModel):
    __abstract__ = True

    id: int = Field(
        sa_type=BIGINT,
        nullable=False,
        primary_key=True
    )
    created_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),
        sa_column_kwargs={
            "server_default": func.now()
        },
        nullable=False
    )
    updated_at: datetime = Field(
        sa_type=TIMESTAMP(timezone=True),
        sa_column_kwargs={
            "server_default": func.now(),
            "onupdate": func.now()
        },
        nullable=False
    )
    deleted_at: datetime | None = Field(
        sa_type=TIMESTAMP(timezone=True),
        nullable=True,
        default=None,
    )
