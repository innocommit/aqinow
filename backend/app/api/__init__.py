from fastapi import APIRouter
from fastapi.routing import APIRoute

from .v1 import api_v1_router


# Reference: https://fastapi.tiangolo.com/advanced/path-operation-advanced-configuration
def use_route_names_as_operation_ids(router: APIRouter) -> None:
    """
    Simplify operation IDs so that generated API clients have simpler function
    names.

    Should be called only after all routes have been added.
    """
    for route in router.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name



use_route_names_as_operation_ids(api_v1_router)