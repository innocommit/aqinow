from .base_schema import BaseSchema, Field


class ErrorResponse(BaseSchema):
    error_code: int
    message: str = Field(..., min_length=1, max_length=255)
