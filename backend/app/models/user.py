from sqlalchemy import String
from sqlalchemy.dialects.postgresql import ENUM as PGEnum
from sqlmodel import Field

from app.enums.user_enum import Role

from .base_model import BaseModel


class User(BaseModel, table=True):
    __tablename__ = "users"

    email: str = Field(
        sa_type=String(255),
        nullable=False,
        index=True,
        unique=True,
    )
    password: str = Field(
        sa_type=String(255),
        nullable=False,
    )
    role: Role = Field(
        sa_type=PGEnum(Role, name="user_role"),
        nullable=False,
    )
    name: str = Field(
        sa_type=String(255),
        nullable=False,
    )
