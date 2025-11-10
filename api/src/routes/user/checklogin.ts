import { authedProcedure } from "../../trpc.ts";

export const checklogin = authedProcedure.query(async (opts) => {
  return {
    username: opts.ctx.user.username,
    admin: opts.ctx.user.username === opts.ctx.env.ADMIN_USERNAME,
  };
});
