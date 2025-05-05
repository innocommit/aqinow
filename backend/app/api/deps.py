from collections.abc import Generator
from typing import Annotated

import jwt
from fastapi import Depends, status, Header
from jwt.exceptions import InvalidTokenError
from pydantic import ValidationError
from sqlmodel import Session, select

from app.core.config import settings
from app.core.exception import UnauthorizedError, AccessDeniedError
from app.core.db import engine
from app.enums.user_enum import Role
from app.models import User
from app.constants.token_constant import TOKEN_TYPE
from app.message.error import ERROR_MESSAGE, Error


def get_db() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_db)]

def get_current_user(
    session: SessionDep, 
    authorization:  Annotated[str | None, Header()] = None
) -> User: 
    if not authorization:
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_UNAUTHORIZED]
        )

    token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
    except (InvalidTokenError, ValidationError) as e:
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_UNAUTHORIZED]
        )

    token_type = payload.get("token_type")
    if token_type != TOKEN_TYPE["ACCESS_TOKEN"]:
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_UNAUTHORIZED]
        )

    query = select(User).where(User.email == payload.get("sub"))
    user = session.exec(query).first()
    if not user:
        raise UnauthorizedError(
            status.HTTP_401_UNAUTHORIZED,
            ERROR_MESSAGE[Error.ERR_UNAUTHORIZED]
        )

    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def allow_admin_role(current_user: CurrentUser) -> User:
    if not current_user.role == Role.ADMIN:
        raise AccessDeniedError(
            status.HTTP_403_FORBIDDEN,
            ERROR_MESSAGE[Error.ERR_UNAUTHORIZED]
        )
    return current_user
