import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { Env } from "./index.ts";

export const createContext = async ({
  req,
  env,
  resHeaders,
}: FetchCreateContextFnOptions & {
  env: Env;
}) => {
  resHeaders.set("Access-Control-Allow-Origin", "*");
  resHeaders.set("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
  resHeaders.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  return {
    req,
    env,
    resHeaders,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
