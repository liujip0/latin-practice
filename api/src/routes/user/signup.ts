import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import z from "zod";
import { User } from "../../dbtypes.ts";
import { publicProcedure } from "../../trpc.ts";

export const signup = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const user = await opts.ctx.env.latin_practice_db
      .prepare("SELECT username FROM Users WHERE username = ?")
      .bind(opts.input.username)
      .run<User>();
    if (user.results.length > 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Username already exists",
      });
    }

    const passwordHash = await bcrypt.hash(opts.input.password, 10);

    const result = await opts.ctx.env.latin_practice_db
      .prepare("INSERT INTO Users (username, password_hash) VALUES (?, ?)")
      .bind(opts.input.username, passwordHash)
      .run();

    if (result.success) {
      return;
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create user",
      });
    }
  });
