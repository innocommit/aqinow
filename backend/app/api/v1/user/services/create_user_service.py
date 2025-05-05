from fastapi import status
from sqlmodel import Session

from app.core.exception import InternalServerError
from app.core.security import get_password_hash
from app.models import User
from app.message.error import ERROR_MESSAGE, Error

from ..schemas.user_request import CreateUserRequest

def create_user(request: CreateUserRequest, session: Session) -> bool:
    try:
        user_create = User(
            name=request.name,
            email=request.email,
            password=get_password_hash(request.password),
            role=request.role
        )
        session.add(user_create)
        session.commit()
        return True
    except Exception:
        session.rollback()
        raise InternalServerError(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
        )