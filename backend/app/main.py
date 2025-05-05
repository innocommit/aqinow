from fastapi import FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

from app.api import api_v1_router
from app.core.config import settings
from app.core.exception import (
    BadRequestError,
    UnauthorizedError,
    AccessDeniedError,
    NotFoundError,
    InternalServerError,
)
from app.core.response import (
    BadRequestResponse,
    UnauthorizedResponse,
    AccessDeniedResponse,
    NotFoundResponse,
    ServerErrorResponse,
)


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=settings.OPENAPI_STR,
)

 
# Set all CORS enabled origins
if settings.all_cors_origins:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.all_cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(api_v1_router, prefix=settings.API_V1)


# Exception handling
# Reference: https://fastapi.tiangolo.com/tutorial/handling-errors/

@app.exception_handler(BadRequestError)
def bad_request_error_handler(request: Request, exc: BadRequestError):
    return BadRequestResponse(exc.error_code, exc.message)


@app.exception_handler(UnauthorizedError)
def unauthorized_error_handler(request: Request, exc: UnauthorizedError):
    return UnauthorizedResponse(exc.error_code, exc.message)


@app.exception_handler(AccessDeniedError)
def access_denied_error_handler(request: Request, exc: AccessDeniedError):
    return AccessDeniedResponse(exc.error_code, exc.message)


@app.exception_handler(NotFoundError)
def not_found_error_handler(request: Request, exc: NotFoundError):
    return NotFoundResponse(exc.error_code, exc.message)


@app.exception_handler(InternalServerError)
def internal_server_error_handler(request: Request, exc: InternalServerError):
    return ServerErrorResponse(exc.error_code, exc.message)


@app.exception_handler(Exception)
def general_error_handler(request: Request, exc: Exception):
    return ServerErrorResponse(500, str(exc))