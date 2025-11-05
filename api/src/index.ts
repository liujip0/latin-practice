import { D1Database } from "@cloudflare/workers-types";
import {
  type FetchCreateContextFnOptions,
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { createContext } from "./context.ts";
import { appRouter } from "./routes/routes.ts";

export interface Env {
  JWT_SECRET_KEY: string;

  latin_practice_db: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return fetchRequestHandler({
      endpoint: "/api",
      req: request,
      router: appRouter,
      createContext: (options: FetchCreateContextFnOptions) =>
        createContext({
          ...options,
          env,
        }),
    });
  },
};
