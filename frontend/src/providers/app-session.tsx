"use client";

import { AnyFunctionAsync } from "@/types/function.type";
import { OnInterceptorsRequest, OnInterceptorsResponse } from "@/types/interceptor.type";
import { client } from "@/lib/api/client.gen";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useRef } from "react";

function AppSessionProvider({
  children
}: {
  children: React.ReactNode
}) {
  const { update, data: session } = useSession();
  const queueRef = useRef<Array<AnyFunctionAsync>>([]);

  const accessToken = session?.accessToken;

  const onInterceptorsRequest = useCallback<OnInterceptorsRequest>(
    async (request) => {
      if (accessToken) {
        request.headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return request;
    },
    [accessToken]
  );

  const onInterceptorsResponse = useCallback<OnInterceptorsResponse>(
    async (response, request) => {
      const status = response.status;
      return response;
    },
    [update]
  );

  client.interceptors.request.use(onInterceptorsRequest);
  client.interceptors.response.use(onInterceptorsResponse);

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(onInterceptorsRequest);
      client.interceptors.response.eject(onInterceptorsResponse);
    }
  }, [onInterceptorsRequest, onInterceptorsResponse])

  return children;
}

export default AppSessionProvider;