import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Env } from "./index.ts";

export const createContext = async ({
  req,
  env,
  resHeaders,
}: FetchCreateContextFnOptions & {
  env: Env;
}) => {
  resHeaders.set("Access-Control-Allow-Origin", env.FRONTEND_URL);
  resHeaders.set("Vary", "Origin");
  resHeaders.set(
    "Access-Control-Expose-Headers",
    "Content-Type,Authorization,Accept"
  );
  resHeaders.set("Access-Control-Max-Age", (60 * 60 * 24).toString());
  resHeaders.set("Access-Control-Allow-Credentials", "true");
  resHeaders.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  resHeaders.set(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Accept,Accept-Language"
  );
  return {
    req,
    env,
    resHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
