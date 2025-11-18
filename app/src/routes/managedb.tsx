import type { Word } from "@latin-practice/api/src/dbtypes.ts";
import { Button, Input, Select, Tabs } from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { trpc } from "../trpc.ts";

export default function ManageDB() {
  const [latin_word1, setLatin_word1] = useState("");
  const [latin_word1Error, setLatin_word1Error] = useState("");
  const [latin_word2, setLatin_word2] = useState("");
  const [latin_word2Error, setLatin_word2Error] = useState("");
  const [english_translation, setEnglish_translation] = useState("");
  const [english_translationError, setEnglish_translationError] = useState("");
  const [noun_declension, setNoun_declension] =
    useState<NonNullable<Word["noun_declension"]>>("1");
  const [noun_gender, setNoun_gender] =
    useState<NonNullable<Word["noun_gender"]>>("masculine");
  const [chapter, setChapter] = useState("");
  const [chapterError, setChapterError] = useState("");
  const [submitError, setSubmitError] = useState("");

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      submitButtonRef.current?.click();
    }
  };

  const addnoun = useMutation(
    trpc.db.addnoun.mutationOptions({
      onSuccess() {
        setSubmitError("Noun added successfully");
        location.reload();
      },
      onError(error) {
        setSubmitError("Error: " + error.message);
      },
    })
  );
  const addnounSubmit = () => {
    let error = false;

    if (latin_word1.trim() === "") {
      setLatin_word1Error("Nominative singular cannot be empty");
      error = true;
    } else {
      setLatin_word1Error("");
    }

    if (latin_word2.trim() === "") {
      setLatin_word2Error("Genitive singular cannot be empty");
      error = true;
    } else {
      setLatin_word2Error("");
    }

    if (english_translation.trim() === "") {
      setEnglish_translationError("English translation cannot be empty");
      error = true;
    } else {
      setEnglish_translationError("");
    }

    if (chapter.trim() === "") {
      setChapterError("Chapter cannot be empty");
      error = true;
    } else if (isNaN(parseInt(chapter))) {
      setChapterError("Chapter must be a number");
      error = true;
    } else if (parseInt(chapter) < 1) {
      setChapterError("Chapter must be at least 1");
      error = true;
    } else {
      setChapterError("");
    }

    if (!error) {
      addnoun.mutate({
        latin_word1: latin_word1.trim(),
        latin_word2: latin_word2.trim(),
        english_translation: english_translation.trim(),
        noun_declension,
        noun_gender,
        chapter: parseInt(chapter),
      });
    }
  };

  return (
    <div>
      <Tabs
        tabs={{
          noun: (
            <div>
              <Input
                id="latin-word1"
                value={latin_word1}
                onChange={setLatin_word1}
                label="Nominative Singular"
                error={latin_word1Error !== ""}
                helperText={latin_word1Error}
                autoFocus
                onKeyDown={submitKeyDown}
              />
              <Input
                id="latin-word2"
                value={latin_word2}
                onChange={setLatin_word2}
                label="Genitive Singular"
                error={latin_word2Error !== ""}
                helperText={latin_word2Error}
                onKeyDown={submitKeyDown}
              />
              <Input
                id="english-translation"
                value={english_translation}
                onChange={setEnglish_translation}
                label="English Translation"
                error={english_translationError !== ""}
                helperText={english_translationError}
                onKeyDown={submitKeyDown}
              />
              <Select
                id="noun-declension"
                value={noun_declension}
                onChange={(value) => {
                  setNoun_declension(
                    value as NonNullable<Word["noun_declension"]>
                  );
                }}
                label="Declension">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="irregular">irregular</option>
              </Select>
              <Select
                id="noun-gender"
                value={noun_gender}
                onChange={(value) => {
                  setNoun_gender(value as NonNullable<Word["noun_gender"]>);
                }}
                label="Gender">
                <option value="masculine">masculine</option>
                <option value="feminine">feminine</option>
                <option value="neuter">neuter</option>
              </Select>
              <Input
                id="chapter"
                type="number"
                value={chapter}
                onChange={setChapter}
                label="Chapter"
                error={chapterError !== ""}
                helperText={chapterError}
                onKeyDown={submitKeyDown}
              />
              <Button
                ref={submitButtonRef}
                onClick={addnounSubmit}>
                Submit
              </Button>
              <p>{submitError}</p>
            </div>
          ),
        }}
      />
    </div>
  );
}
