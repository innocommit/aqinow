import { RequestOptions } from "@hey-api/client-fetch";

export type OnInterceptorsRequest = (
  request: Request,
  options: RequestOptions<boolean, string>,
) => Promise<Request>;

export type OnInterceptorsResponse = (
  response: Response,
  request: Request,
  options: RequestOptions<boolean, string>,
) => Promise<Response>;