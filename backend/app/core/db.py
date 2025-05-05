from sqlmodel import create_engine, Session, select

from app.core.config import settings
from app.enums.user_enum import Role
from app.models import User

from .security import get_password_hash


engine = create_engine(str(settings.SQLALCHEMY_DATABASE_URI))


# Make sure all models are imported (app.models) before initializing DB
def init_db(session: Session) -> None:
    user = session.exec(
        select(User).where(User.email == settings.FIRST_SUPERUSER_EMAIL)
    ).first()
    if not user:
        try:
            new_user = User(
                name=settings.FIRST_SUPERUSER,
                email=settings.FIRST_SUPERUSER_EMAIL,
                password=get_password_hash(settings.FIRST_SUPERUSER_PASSWORD),
                role=Role.ADMIN,
            )
            session.add(new_user)
            session.commit()
            return
        except Exception as e:
            session.rollback()
            raise e
        
    print("SuperUser has already initialized")