import "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    errorCode?: number,
    message?: string;
  }

  interface Session {
    user: {
      name?: string;
      token?: string;
      email?: string;
    };
    role?: string;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    role: string;
  }
}