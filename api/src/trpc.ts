import { initTRPC, TRPCError } from "@trpc/server";
import jwt from "jsonwebtoken";
import type { Context } from "./context.ts";
import { User } from "./dbtypes.ts";

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async (opts) => {
  const token = opts.ctx.req.headers
    .get("Authorization")
    ?.replace("Bearer ", "");
  if (!token) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing or invalid token",
    });
  }

  const validToken = jwt.verify(
    token,
    opts.ctx.env.JWT_SECRET_KEY
  ) as jwt.JwtPayload;
  if (!("username" in validToken)) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Missing or invalid token",
    });
  }

  const user = await opts.ctx.env.latin_practice_db
    .prepare("SELECT username FROM Users WHERE username = ?")
    .bind(validToken.username)
    .run<User>();

  if (!user.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Failed to fetch user",
    });
  }

  return opts.next({
    ...opts,
    ctx: {
      ...opts.ctx,
      user: {
        username: user.results[0].username,
        created_at: user.results[0].created_at,
      },
    },
  });
});
