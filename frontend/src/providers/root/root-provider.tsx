"use client";

import { handleToast } from "@/utils/toast.util";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
import { useMemo } from "react";
import AppSessionProvider from "@/providers/app-session";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "../theme/theme-provider";

function RootProvider({
  session,
  children,
}: {
  session: Session | null,
  children: React.ReactNode,
}) {
  const queryClient = useMemo(
    () => new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          refetchOnWindowFocus: false
        },
        mutations: {
          retry: false,
        },
      },
      queryCache: new QueryCache({
        onError: (error, query) => {
          if (error instanceof TypeError && error?.message === "Failed to fetch") {
            handleToast("Mất kết nối với máy chủ");
            return;
          }
          return handleToast(error.message);
        }
      }),
      mutationCache: new MutationCache({
        onError: (error, _, __, mutation) => {
          if (error instanceof TypeError && error?.message === "Failed to fetch") {
            handleToast("Mất kết nối với máy chủ");
            return;
          }
          return handleToast(error.message);
        },
        onSuccess(data, _, __, mutation) { },
      })
    }),
    []
  )
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <AppSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
            enableSystem
          >
            <Toaster />
            {children}
          </ThemeProvider>
        </AppSessionProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default RootProvider