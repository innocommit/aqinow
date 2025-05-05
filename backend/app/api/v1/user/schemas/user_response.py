from datetime import datetime

from app.enums.user_enum import Role
from app.schemas.base_schema import Field, BaseResponse, BaseSchema, PaginatedResponse


class UserResponse(BaseSchema):
    id: int
    name: str
    email: str
    role: Role
    created_at: datetime = Field(alias="createdAt")
    updated_at: datetime = Field(alias="updatedAt")
    deleted_at: datetime | None = Field(default=None, alias="deletedAt")


class GetUsersResponse(PaginatedResponse):
    data: list[UserResponse]
