import { TokenResponse } from "@/lib/api";
import { getRouter } from "@/utils/router.util";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const url = process.env.NEXT_PUBLIC_API_URL;

const NEXT_AUTH_OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const res = await fetch(`${url}/api/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          })
          
          if (!res.ok) {
            const errorData = await res.json();
            return errorData;
          }

          const data = await res.json();
          return data;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: getRouter("login"),
    signIn: getRouter("login")
  },
  callbacks: {
    async signIn({ user }) {
      if (user.errorCode) {
        throw new Error(user.message)
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role;
        token.accessToken = (user as any).accessToken;
      }

      if (trigger === "update" && session) {
        const _session = session as TokenResponse;
        token.accessToken = _session.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      session.role = token.role as string;
      session.accessToken = token.accessToken as string;
      return session;
    }
  }
}

export default NEXT_AUTH_OPTIONS;
