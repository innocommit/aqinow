import { ROUTERS } from "@/constants/router.constant";
import { AnyFunction } from "@/types/function.type";
import { ArgsRouterFunction, RouterNames } from "@/types/router.type";

export const getRouter = <N extends RouterNames>(name?: N, ...args: ArgsRouterFunction<N>) => {
  if (!name) return "";
  const router = ROUTERS[name]?.router ?? "";
  return typeof router === "function" ? (router as AnyFunction<string>)(...args) : router;
};

export const getPatternByRouter = <N extends RouterNames>(name: N) => {
  return ROUTERS[name]?.pattern;
}

export const getRegexByPattern = (pattern: string) => new RegExp("^" + pattern.replace(/:[^/]+/g, '[^/]+' + '$'));

export const setAuthorization = (request: Request, token?: string) => {
  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`)
  }
}