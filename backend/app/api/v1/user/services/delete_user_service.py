from fastapi import status
from sqlmodel import Session, delete

from app.core.exception import InternalServerError
from app.models import User
from app.message.error import ERROR_MESSAGE, Error


def delete_user(id: int, session: Session) -> bool:
    try:
        query = delete(User).where(User.id == id)
        session.exec(query)
        session.commit()
        return True
    except Exception:
        session.rollback()
        raise InternalServerError(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
        )