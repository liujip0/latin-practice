import { router } from "../trpc.ts";
import { user } from "./user/routes.ts";

export const appRouter = router({
  user,
});

export type AppRouter = typeof appRouter;
