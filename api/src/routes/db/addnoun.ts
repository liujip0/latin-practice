import { TRPCError } from "@trpc/server";
import z from "zod";
import { adminProcedure } from "../../trpc.ts";

export const addnoun = adminProcedure
  .input(
    z.object({
      latin_word1: z.string(),
      latin_word2: z.string(),
      english_translation: z.string(),
      noun_declension: z.union([
        z.literal("1"),
        z.literal("2"),
        z.literal("3"),
        z.literal("4"),
        z.literal("5"),
        z.literal("irregular"),
      ]),
      noun_gender: z.union([
        z.literal("masculine"),
        z.literal("feminine"),
        z.literal("neuter"),
      ]),
      chapter: z.number().int().min(1),
    })
  )
  .mutation(async (opts) => {
    const result = await opts.ctx.env.latin_practice_db
      .prepare(
        `INSERT INTO Words
          (latin_word1,
          latin_word2,
          english_translation,
          part_of_speech,
          noun_declension,
          noun_gender,
          chapter)
        VALUES (?, ?, ?, 'noun', ?, ?, ?);`
      )
      .bind(
        opts.input.latin_word1,
        opts.input.latin_word2,
        opts.input.english_translation,
        opts.input.noun_declension,
        opts.input.noun_gender,
        opts.input.chapter
      )
      .run();

    if (!result.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to add word",
      });
    }
  });
