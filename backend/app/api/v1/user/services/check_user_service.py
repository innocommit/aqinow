from fastapi import status
from sqlmodel import Session, select

from app.core.exception import InternalServerError, BadRequestError
from app.models import User
from app.message.error import ERROR_MESSAGE, Error

from ..schemas.user_request import CreateUserRequest

def is_not_exist_user_by_email(request: CreateUserRequest, session: Session) -> bool:
    try:
        query = select(User).where(User.email == request.email)
        user = session.exec(query).first()
        if user:
            raise BadRequestError(
                status.HTTP_400_BAD_REQUEST,
                ERROR_MESSAGE[Error.ERR_CREATE_USER_EXIST_EMAIL]
            )
        return True
    except BadRequestError as e:
        raise e
    except Exception:
        session.rollback()
        raise InternalServerError(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
        )
    

def is_exist_user_by_id(id: int, session: Session) -> bool:
    try:
        query = select(User).where(User.id == id)
        user = session.exec(query).first()
        if not user:
            raise BadRequestError(
                status.HTTP_400_BAD_REQUEST,
                ERROR_MESSAGE[Error.ERR_USER_NOT_FOUND]
            )
        return True
    except BadRequestError as e:
        raise e
    except Exception:
        session.rollback()
        raise InternalServerError(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
        )