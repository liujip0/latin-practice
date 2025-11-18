import { router } from "../trpc.ts";
import { db } from "./db/routes.ts";
import { user } from "./user/routes.ts";
import { words } from "./words/routes.ts";

export const appRouter = router({
  db,
  user,
  words,
});

export type AppRouter = typeof appRouter;
