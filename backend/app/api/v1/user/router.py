from fastapi import APIRouter, Depends, status
from sqlmodel import select

from app.api.deps import SessionDep, allow_admin_role
from app.core.response import private_api_responses
from app.models import User
from app.services.pagination_service import PaginationQuery, get_pagination_data
from app.schemas.base_schema import BaseResponse
from app.message.success import SUCCESS_MESSAGE, Success

from .schemas.user_request import CreateUserRequest
from .schemas.user_response import GetUsersResponse, UserResponse
from .services import (
    check_user_service,
    create_user_service,
    delete_user_service,
)


router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses=private_api_responses,
    dependencies=[Depends(allow_admin_role)]
)


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    response_model=GetUsersResponse
)
def get_all_users(
    session: SessionDep,
    pagination: PaginationQuery = Depends(),
):
    query = select(User)
    result = get_pagination_data(session, query, pagination)

    return GetUsersResponse(
        data=[UserResponse(**user.model_dump()) for user in result["data"]],
        total=result["total"],
        total_page=result["total_page"]
    )


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    response_model=BaseResponse,
)
def create_user(
    request: CreateUserRequest,
    session: SessionDep,
) -> BaseResponse:
    check_user_service.is_not_exist_user_by_email(request, session)
    create_user_service.create_user(request, session)
    return BaseResponse(
        code=status.HTTP_201_CREATED,
        message=SUCCESS_MESSAGE[Success.SUCCESS_CREATE_USER]
    )


@router.delete(
    "/{id}",
    status_code=status.HTTP_200_OK,
    response_model=BaseResponse,
)
def delete_user(
    id: int,
    session: SessionDep,
) -> BaseResponse:
    check_user_service.is_exist_user_by_id(id, session)
    delete_user_service.delete_user(id, session)
    return BaseResponse(
        code=status.HTTP_200_OK,
        message=SUCCESS_MESSAGE[Success.SUCCESS_DELETE_USER]
    )
