// This file is auto-generated by @hey-api/openapi-ts

import { type Options, login, getAllUsers, createUser, deleteUser } from '../sdk.gen';
import { queryOptions, type UseMutationOptions, infiniteQueryOptions, type InfiniteData } from '@tanstack/react-query';
import type { LoginData, LoginError, LoginResponse, GetAllUsersData, GetAllUsersError, GetAllUsersResponse, CreateUserData, CreateUserError, CreateUserResponse, DeleteUserData, DeleteUserError, DeleteUserResponse } from '../types.gen';
import { client as _heyApiClient } from '../client.gen';

export type QueryKey<TOptions extends Options> = [
    Pick<TOptions, 'baseUrl' | 'body' | 'headers' | 'path' | 'query'> & {
        _id: string;
        _infinite?: boolean;
    }
];

const createQueryKey = <TOptions extends Options>(id: string, options?: TOptions, infinite?: boolean): [
    QueryKey<TOptions>[0]
] => {
    const params: QueryKey<TOptions>[0] = { _id: id, baseUrl: (options?.client ?? _heyApiClient).getConfig().baseUrl } as QueryKey<TOptions>[0];
    if (infinite) {
        params._infinite = infinite;
    }
    if (options?.body) {
        params.body = options.body;
    }
    if (options?.headers) {
        params.headers = options.headers;
    }
    if (options?.path) {
        params.path = options.path;
    }
    if (options?.query) {
        params.query = options.query;
    }
    return [
        params
    ];
};

export const loginQueryKey = (options: Options<LoginData>) => createQueryKey('login', options);

export const loginOptions = (options: Options<LoginData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await login({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: loginQueryKey(options)
    });
};

export const loginMutation = (options?: Partial<Options<LoginData>>): UseMutationOptions<LoginResponse, LoginError, Options<LoginData>> => {
    const mutationOptions: UseMutationOptions<LoginResponse, LoginError, Options<LoginData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await login({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const getAllUsersQueryKey = (options?: Options<GetAllUsersData>) => createQueryKey('getAllUsers', options);

export const getAllUsersOptions = (options?: Options<GetAllUsersData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await getAllUsers({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getAllUsersQueryKey(options)
    });
};

const createInfiniteParams = <K extends Pick<QueryKey<Options>[0], 'body' | 'headers' | 'path' | 'query'>>(queryKey: QueryKey<Options>, page: K) => {
    const params = queryKey[0];
    if (page.body) {
        params.body = {
            ...queryKey[0].body as any,
            ...page.body as any
        };
    }
    if (page.headers) {
        params.headers = {
            ...queryKey[0].headers,
            ...page.headers
        };
    }
    if (page.path) {
        params.path = {
            ...queryKey[0].path as any,
            ...page.path as any
        };
    }
    if (page.query) {
        params.query = {
            ...queryKey[0].query as any,
            ...page.query as any
        };
    }
    return params as unknown as typeof page;
};

export const getAllUsersInfiniteQueryKey = (options?: Options<GetAllUsersData>): QueryKey<Options<GetAllUsersData>> => createQueryKey('getAllUsers', options, true);

export const getAllUsersInfiniteOptions = (options?: Options<GetAllUsersData>) => {
    return infiniteQueryOptions<GetAllUsersResponse, GetAllUsersError, InfiniteData<GetAllUsersResponse>, QueryKey<Options<GetAllUsersData>>, number | Pick<QueryKey<Options<GetAllUsersData>>[0], 'body' | 'headers' | 'path' | 'query'>>(
    // @ts-ignore
    {
        queryFn: async ({ pageParam, queryKey, signal }) => {
            // @ts-ignore
            const page: Pick<QueryKey<Options<GetAllUsersData>>[0], 'body' | 'headers' | 'path' | 'query'> = typeof pageParam === 'object' ? pageParam : {
                query: {
                    page: pageParam
                }
            };
            const params = createInfiniteParams(queryKey, page);
            const { data } = await getAllUsers({
                ...options,
                ...params,
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: getAllUsersInfiniteQueryKey(options)
    });
};

export const createUserQueryKey = (options: Options<CreateUserData>) => createQueryKey('createUser', options);

export const createUserOptions = (options: Options<CreateUserData>) => {
    return queryOptions({
        queryFn: async ({ queryKey, signal }) => {
            const { data } = await createUser({
                ...options,
                ...queryKey[0],
                signal,
                throwOnError: true
            });
            return data;
        },
        queryKey: createUserQueryKey(options)
    });
};

export const createUserMutation = (options?: Partial<Options<CreateUserData>>): UseMutationOptions<CreateUserResponse, CreateUserError, Options<CreateUserData>> => {
    const mutationOptions: UseMutationOptions<CreateUserResponse, CreateUserError, Options<CreateUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await createUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};

export const deleteUserMutation = (options?: Partial<Options<DeleteUserData>>): UseMutationOptions<DeleteUserResponse, DeleteUserError, Options<DeleteUserData>> => {
    const mutationOptions: UseMutationOptions<DeleteUserResponse, DeleteUserError, Options<DeleteUserData>> = {
        mutationFn: async (localOptions) => {
            const { data } = await deleteUser({
                ...options,
                ...localOptions,
                throwOnError: true
            });
            return data;
        }
    };
    return mutationOptions;
};