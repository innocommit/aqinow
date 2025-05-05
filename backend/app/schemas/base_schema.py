from datetime import datetime
from fastapi import status
from typing import Generic, TypeVar

from pydantic import BaseModel, Field, ConfigDict

from app.utils.common_util import to_camel, to_vietnam_timezone_str
from app.message.success import SUCCESS_MESSAGE, Success


# Reference: https://docs.pydantic.dev/2.0/usage/model_config/
class BaseSchema(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        json_encoders={
            datetime: to_vietnam_timezone_str,
        },
        populate_by_name=True
    )


# All response need used this model
class BaseResponse(BaseSchema):
    code: int = Field(default=status.HTTP_200_OK)
    message: str = Field(default=SUCCESS_MESSAGE[Success.SUCCESS], min_length=1, max_length=255)


T = TypeVar("T")

class PaginatedResponse(BaseResponse, Generic[T]):
    data: list[T]
    total: int
    total_page: int