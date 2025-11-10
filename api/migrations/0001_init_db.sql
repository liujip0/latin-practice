-- Migration number: 0001 	 2025-11-05T14:15:52.527Z
CREATE TABLE IF NOT EXISTS Users (
  username TEXT PRIMARY KEY NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  latin_word1 TEXT NOT NULL,
  latin_word2 TEXT,
  latin_word3 TEXT,
  latin_word4 TEXT,
  english_translation TEXT NOT NULL,
  part_of_speech TEXT CHECK (
    part_of_speech IN (
      'noun',
      'verb',
      'adjective',
      'adverb',
      'preposition',
      'conjunction',
      'interjection',
      'pronoun',
      'phrase',
      'enclitic'
    )
  ) NOT NULL,
  noun_declension TEXT CHECK (
    noun_declension IN ('1', '2', '3', '4', '5', 'irregular')
  ),
  noun_gender TEXT CHECK (
    noun_gender IN ('masculine', 'feminine', 'neuter')
  ),
  verb_conjugation TEXT CHECK (
    verb_conjugation IN ('1', '2', '3', '3io', '4', 'irregular')
  ),
  adjective_declension TEXT CHECK (adjective_declension IN ('1/2', '3', 'irregular')),
  preposition_object TEXT CHECK (preposition_object IN ('accusative', 'ablative')),
  chapter INTEGER
);
