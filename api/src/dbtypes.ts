import z from "zod";

export type User = {
  username: string;
  password_hash: string;
  created_at: string;
};

export const PartOfSpeech = z.union([
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
]);
export type Word = {
  id: number;
  latin_word1: string;
  latin_word2?: string;
  latin_word3?: string;
  latin_word4?: string;
  english_translation: string;
  part_of_speech: z.infer<typeof PartOfSpeech>;
  noun_declension?: "1" | "2" | "3" | "4" | "5" | "irregular";
  noun_gender?: "masculine" | "feminine" | "neuter";
  verb_conjugation?: "1" | "2" | "3" | "3io" | "4" | "irregular";
  adjective_declension?: "1/2" | "3" | "irregular";
  preposition_object?: "accusative" | "ablative";
  chapter: number;
};

export const AlphabetLetter = z.union([
  z.literal("A"),
  z.literal("B"),
  z.literal("C"),
  z.literal("D"),
  z.literal("E"),
  z.literal("F"),
  z.literal("G"),
  z.literal("H"),
  z.literal("I"),
  z.literal("J"),
  z.literal("K"),
  z.literal("L"),
  z.literal("M"),
  z.literal("N"),
  z.literal("O"),
  z.literal("P"),
  z.literal("Q"),
  z.literal("R"),
  z.literal("S"),
  z.literal("T"),
  z.literal("U"),
  z.literal("V"),
  z.literal("W"),
  z.literal("X"),
  z.literal("Y"),
  z.literal("Z"),
]);
export type AlphabetLetter = z.infer<typeof AlphabetLetter>;
