import { IRouter } from "@/types/router.type";
import { Role } from "@/lib/api";

export type Routers = typeof ROUTERS;

export const ROUTERS = {
  login: {
    private: false,
    role: undefined,
    router: "/login",
    pattern: "/login"
  },
  dashboard: {
    private: true,
    role: undefined,
    router: "/dashboard",
    pattern: "/dashboard"
  },
  user: {
    private: true,
    role: [Role.ADMIN],
    router: "/user",
    pattern: "/user"
  },
  top: {
    private: true,
    role: undefined,
    router: "/",
    pattern: "/",
  }
} satisfies Record<string, IRouter>;