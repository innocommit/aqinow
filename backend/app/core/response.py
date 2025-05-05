from fastapi import status
from fastapi.responses import JSONResponse

from app.message.error import Error, ERROR_MESSAGE
from app.schemas.error_schema import ErrorResponse


public_api_responses = {
    400: { "model": ErrorResponse },
    401: { "model": ErrorResponse },
    403: { "model": ErrorResponse },
    404: { "model": ErrorResponse },
    422: { "model": ErrorResponse },
    500: { "model": ErrorResponse },
}

private_api_responses = {
    400: { "model": ErrorResponse },
    401: { "model": ErrorResponse },
    403: { "model": ErrorResponse },
    404: { "model": ErrorResponse },
    422: { "model": ErrorResponse },
    500: { "model": ErrorResponse },
}


class BadRequestResponse(JSONResponse):
    def __init__(self, error_code: int, message: str | None = None):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "errorCode": error_code,
                "message": message
            }
        )


class UnauthorizedResponse(JSONResponse):
    def __init__(self,  error_code: int, message: str | None = None):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "errorCode": error_code,
                "message": message
            }
        )


class AccessDeniedResponse(JSONResponse):
    def __init__(self,  error_code: int, message: str | None = None):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            content={
                "errorCode": error_code,
                "message": message
            }
        )


class NotFoundResponse(JSONResponse):
    def __init__(self,  error_code: int, message: str | None = None):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            content={
                "errorCode": error_code,
                "message": message if message else ERROR_MESSAGE[Error.ERR_NOT_FOUND]
            }
        )


class ServerErrorResponse(JSONResponse):
    def __init__(self,  error_code: int, message: str | None = None):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "errorCode": error_code,
                "message": message if message else ERROR_MESSAGE[Error.ERR_INTERNAL_SERVER_ERROR]
            }
        )
