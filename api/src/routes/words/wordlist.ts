import { TRPCError } from "@trpc/server";
import z from "zod";
import { AlphabetLetter, Word } from "../../dbtypes.ts";
import { authedProcedure } from "../../trpc.ts";
import removeMacrons from "../../util/removeMacrons.ts";

export const wordlist = authedProcedure
  .input(
    z.object({
      partsOfSpeech: z.array(
        z.union([
          z.literal("noun"),
          z.literal("verb"),
          z.literal("adjective"),
          z.literal("adverb"),
          z.literal("preposition"),
          z.literal("conjunction"),
          z.literal("interjection"),
          z.literal("pronoun"),
          z.literal("phrase"),
          z.literal("enclitic"),
        ])
      ),
      minChapter: z.number().int().min(1).max(18),
      maxChapter: z.number().int().min(1).max(18),
      minAlphabet: AlphabetLetter,
      maxAlphabet: AlphabetLetter,
    })
  )
  .query(async (opts) => {
    const words = await opts.ctx.env.latin_practice_db
      .prepare(
        `SELECT
          id,
          latin_word1,
          latin_word2,
          latin_word3,
          latin_word4,
          english_translation,
          part_of_speech,
          noun_declension,
          noun_gender,
          verb_conjugation,
          adjective_declension,
          preposition_object,
          chapter
        FROM Words
        WHERE
          part_of_speech IN (?) AND
          chapter BETWEEN ? AND ?;`
      )
      .bind(
        opts.input.partsOfSpeech.join(","),
        opts.input.minChapter,
        opts.input.maxChapter
      )
      .run<Word>();

    if (!words.success) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch words",
      });
    }

    return words.results.filter((word) => {
      if (
        removeMacrons(word.latin_word1[0]).toUpperCase() <
        opts.input.minAlphabet
      ) {
        return false;
      }

      if (
        removeMacrons(word.latin_word1[0]).toUpperCase() >
        opts.input.maxAlphabet
      ) {
        return false;
      }

      return true;
    });
  });
