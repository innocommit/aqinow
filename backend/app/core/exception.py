from fastapi import status


class BadRequestError(Exception):
    def __init__(self, error_code: int, message: str | None = None) -> None:
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.error_code = error_code
        self.message = message


class UnauthorizedError(Exception):
    def __init__(self, error_code: int, message: str | None = None) -> None:
        self.status_code = status.HTTP_401_UNAUTHORIZED
        self.error_code = error_code        
        self.message = message


class AccessDeniedError(Exception):
    def __init__(self, error_code: int, message: str | None = None) -> None:
        self.status_code = status.HTTP_403_FORBIDDEN
        self.error_code = error_code 
        self.message = message


class NotFoundError(Exception):
    def __init__(self, error_code: int, message: str | None = None) -> None:
        self.status_code = status.HTTP_404_NOT_FOUND
        self.error_code = error_code 
        self.message = message


class InternalServerError(Exception):
    def __init__(self, error_code: int, message: str | None = None) -> None:
        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        self.error_code = error_code 
        self.message = message