from pydantic import BaseModel, Field

from app.enums.user_enum import Role


class CreateUserRequest(BaseModel):
    email: str = Field(
        ...,
        min_length=1,
        max_length=255
    )
    password: str = Field(
        ...,
        min_length=1,
        max_length=255
    )
    name: str = Field(
        ...,
        min_length=1,
        max_length=255
    )
    role: Role = Field(
        ...
    )