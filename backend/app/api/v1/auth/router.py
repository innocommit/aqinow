from fastapi import APIRouter

from app.api.deps import SessionDep
from app.core.response import public_api_responses
from app.message.success import SUCCESS_MESSAGE, Success

from .schemas.auth_request import LoginRequest
from .schemas.auth_response import TokenResponse
from .services import auth_service


router = APIRouter(
    prefix="/auth",
    tags=["auth"],
    responses=public_api_responses,
)


@router.post("/login", response_model=TokenResponse)
def login(
    session: SessionDep,
    request: LoginRequest
) -> TokenResponse:
    user = auth_service.authenticate(session, request.email, request.password)
    return TokenResponse(
        message=SUCCESS_MESSAGE[Success.SUCCESS_LOGIN],
        name=user.name,
        role=user.role,
        email=user.email,
        access_token=auth_service.create_access_token(user)
    )
