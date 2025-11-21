import type { AlphabetLetter, Word } from "@latin-practice/api/src/dbtypes.ts";
import { Button } from "@liujip0/components";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_KEYS } from "../../localstorage.ts";
import { trpc } from "../../trpc.ts";
import type { PracticeQuestionTypes } from "./index.tsx";

type PracticeProps = {
  setPage: (value: "practice" | "settings") => void;
};
export default function Practice({ setPage }: PracticeProps) {
  const partsOfSpeech = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.settings.partsOfSpeech)!
  ) as Word["part_of_speech"][];
  const minChapter = parseInt(
    localStorage.getItem(LOCAL_STORAGE_KEYS.settings.minChapter)!
  );
  const maxChapter = parseInt(
    localStorage.getItem(LOCAL_STORAGE_KEYS.settings.maxChapter)!
  );
  const minAlphabet = localStorage.getItem(
    LOCAL_STORAGE_KEYS.settings.minAlphabet
  ) as AlphabetLetter;
  const maxAlphabet = localStorage.getItem(
    LOCAL_STORAGE_KEYS.settings.maxAlphabet
  ) as AlphabetLetter;
  const questionTypes = JSON.parse(
    localStorage.getItem(LOCAL_STORAGE_KEYS.settings.questionTypes)!
  ) as (typeof PracticeQuestionTypes)[number][];

  const wordlist = useQuery(
    trpc.words.wordlist.queryOptions({
      partsOfSpeech,
      minChapter,
      maxChapter,
      minAlphabet,
      maxAlphabet,
    })
  );

  const navigate = useNavigate();
  useEffect(() => {
    if (wordlist.error && wordlist.error.data?.code === "UNAUTHORIZED") {
      navigate("/");
    }
  });

  return (
    <div>
      <div>
        {wordlist.data?.map((word) => {
          return <div key={word.id}>{word.latin_word1}</div>;
        })}
      </div>
      <Button
        onClick={() => {
          setPage("settings");
        }}>
        Settings
      </Button>
    </div>
  );
}
