from sqlalchemy import Select
from sqlmodel import Session, asc, desc, select, func
from fastapi import status

from app.constants.pagination_constant import (
    DEFAULT_PAGE,
    DEFAULT_PAGE_SIZE,
    DEFAULT_SORT_KEY
)
from app.core.exception import InternalServerError
from app.schemas.base_schema import Field, BaseSchema
from app.enums.pagination_enum import SortOrder
from app.message.error import ERROR_MESSAGE, Error


class PaginationQuery(BaseSchema):
    page: int = Field(default=DEFAULT_PAGE, ge=1)
    page_size: int = Field(default=DEFAULT_PAGE_SIZE, ge=1, le=100)
    sort_order: SortOrder | None = Field(default=SortOrder.DESC)
    sort_key: str | None = Field(default=DEFAULT_SORT_KEY)


def get_pagination_data(
    session: Session,
    query: Select,
    pagination: PaginationQuery
):
    try:
        sort_column = desc(pagination.sort_key) if pagination.sort_order == SortOrder.DESC else asc(pagination.sort_key)
        query = query.order_by(sort_column)
        
        total_query = select(func.count()).select_from(query.subquery())
        total = session.exec(total_query).first()

        # Apply pagination
        query = query.offset((pagination.page - 1) * pagination.page_size).limit(pagination.page_size)
        data = session.exec(query).all()

        total_page = (total + pagination.page_size - 1) // pagination.page_size

        return {
            "total": total,
            "total_page": total_page,
            "data": data,
        }
    
    except Exception as e:
        print(e)
        raise InternalServerError(
            status.HTTP_500_INTERNAL_SERVER_ERROR,
            ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
        )