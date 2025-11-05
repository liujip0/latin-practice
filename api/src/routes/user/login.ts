import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import { User } from "../../dbtypes.ts";
import { publicProcedure } from "../../trpc.ts";

export const login = publicProcedure
  .input(
    z.object({
      username: z.string(),
      password: z.string(),
    })
  )
  .mutation(async (opts) => {
    const user = await opts.ctx.env.latin_practice_db
      .prepare("SELECT username, password_hash FROM Users WHERE username = ?")
      .bind(opts.input.username)
      .run<User>();

    if (!user.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user",
      });
    }

    if (user.results.length === 0) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    const passwordHash = user.results[0].password_hash;
    const validPassword = await bcrypt.compare(
      opts.input.password,
      passwordHash
    );

    if (!validPassword) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid username or password",
      });
    }

    return jwt.sign(
      {
        username: user.results[0].username,
      },
      opts.ctx.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
  });
