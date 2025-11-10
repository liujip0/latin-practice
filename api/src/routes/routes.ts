import { router } from "../trpc.ts";
import { db } from "./db/routes.ts";
import { user } from "./user/routes.ts";

export const appRouter = router({
  db,
  user,
});

export type AppRouter = typeof appRouter;
