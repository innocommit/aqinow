from app.schemas.base_schema import BaseModel, Field


class LoginRequest(BaseModel):
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