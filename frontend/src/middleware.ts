import { withAuth } from "next-auth/middleware";
import { RouterNames, URLPatternRouter } from "@/types/router.type";
import { ROUTERS } from "@/constants/router.constant";
import { NextRequest, NextResponse, URLPattern } from "next/server";
import { JWT } from "next-auth/jwt";
import { getRouter } from "@/utils/router.util";
import { Role } from "./lib/api";
import NEXT_AUTH_OPTIONS from "@/configs/next-auth.config";

const urlPatternRouters: Array<URLPatternRouter> = Object.entries(ROUTERS).map(
  ([name, router]) => ({
    ...router,
    name: name as RouterNames,
    pattern: new URLPattern({ pathname: router.pattern })
  })
);

export default withAuth(
  (req: NextRequest & { nextauth: { token: JWT | null } }) => {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const searchParams = req.nextUrl.searchParams.toString();
    const route = urlPatternRouters.find((item) => item.pattern.test({ pathname }));

    if (!route) {
      return NextResponse.next();
    }

    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = getRouter("login");
    loginUrl.searchParams.set("callbackUrl", pathname + (searchParams ? "?" + searchParams : ""));

    if (!token && route?.private) {
      return NextResponse.redirect(loginUrl);
    }

    if (token && route.role && !route.role.includes(token.role)) {
      return NextResponse.rewrite(new URL(req.url));
    }

    if (pathname === getRouter("top") && token) {
      return NextResponse.redirect(
        new URL(getRouter("dashboard"), req.url)
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => {
        return true;
      }
    },
    pages: NEXT_AUTH_OPTIONS.pages,
    secret: NEXT_AUTH_OPTIONS.secret
  }
);

export const config = { matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"] }