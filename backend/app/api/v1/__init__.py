from fastapi import APIRouter

from .auth.router import router as auth_router
from .user.router import router as user_router


api_v1_router = APIRouter()

api_v1_router.include_router(auth_router)
api_v1_router.include_router(user_router)