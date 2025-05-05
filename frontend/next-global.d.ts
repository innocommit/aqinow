import "next/server";
import { IRouter } from "@/types/router.type";

declare module "next/server" {
  interface NextRequest {
    router?: IRouter;
  }
}