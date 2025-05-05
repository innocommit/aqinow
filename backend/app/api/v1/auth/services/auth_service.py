from fastapi import status
from sqlmodel import Session, select

from app.core.config import settings
from app.core.exception import UnauthorizedError
from app.constants.token_constant import TOKEN_TYPE
from app.core.security import verify_password, create_token
from app.models import User
from app.message.error import ERROR_MESSAGE, Error


def get_user_by_email(session: Session, email: str) -> User | None:
    query = select(User).where(User.email == email)
    user = session.exec(query).first()
    return user


def authenticate(session: Session, email: str, password: str) -> User:
    user = get_user_by_email(session, email)
    if not user:
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_NOT_FOUND]
        )
    
    if not verify_password(password, user.password):
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_PASSWORD_NOT_MATCH]
        )
    
    return user


def create_access_token(user: User) -> str:
    return create_token(user.email, TOKEN_TYPE["ACCESS_TOKEN"], settings.ACCESS_TOKEN_EXPIRE_MINUTES)