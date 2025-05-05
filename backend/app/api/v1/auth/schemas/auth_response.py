from app.schemas.base_schema import BaseResponse
from app.enums.user_enum import Role


class TokenResponse(BaseResponse):
    name: str
    role: Role
    email: str
    access_token: str