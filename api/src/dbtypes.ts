export type User = {
  username: string;
  password_hash: string;
  created_at: string;
};

export type Word = {
  id: number;
  latin_word1: string;
  latin_word2?: string;
  latin_word3?: string;
  latin_word4?: string;
  english_translation: string;
  part_of_speech:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "preposition"
    | "conjunction"
    | "interjection"
    | "pronoun"
    | "phrase"
    | "enclitic";
  noun_declension?: "1" | "2" | "3" | "4" | "5" | "irregular";
  noun_gender?: "masculine" | "feminine" | "neuter";
  verb_conjugation?: "1" | "2" | "3" | "3io" | "4" | "irregular";
  adjective_declension?: "1/2" | "3" | "irregular";
  preposition_object?: "accusative" | "ablative";
  chapter: number;
};
