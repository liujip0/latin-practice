import type { AlphabetLetter, Word } from "@latin-practice/api/src/dbtypes.ts";
import { Button, Checkbox, Input, Select } from "@liujip0/components";
import { useState } from "react";
import { LOCAL_STORAGE_KEYS } from "../../localstorage.ts";
import { PracticeQuestionTypes } from "./index.tsx";

type SettingsProps = {
  setPage: (value: "practice" | "settings") => void;
};
export default function Settings({ setPage }: SettingsProps) {
  const [partsOfSpeech, setPartsOfSpeech] = useState<Word["part_of_speech"][]>(
    () => {
      const stored = localStorage.getItem(
        LOCAL_STORAGE_KEYS.settings.partsOfSpeech
      );
      if (stored) {
        return JSON.parse(stored) as Word["part_of_speech"][];
      } else {
        localStorage.setItem(
          LOCAL_STORAGE_KEYS.settings.partsOfSpeech,
          JSON.stringify(["noun"])
        );
        return ["noun"];
      }
    }
  );
  const [minChapter, setMinChapter] = useState<number>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.settings.minChapter);
    if (stored) {
      return parseInt(stored);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.settings.minChapter, "1");
      return 1;
    }
  });
  const [maxChapter, setMaxChapter] = useState<number>(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.settings.maxChapter);
    if (stored) {
      return parseInt(stored);
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.settings.maxChapter, "18");
      return 18;
    }
  });
  const [minAlphabet, setMinAlphabet] = useState<AlphabetLetter>(() => {
    const stored = localStorage.getItem(
      LOCAL_STORAGE_KEYS.settings.minAlphabet
    );
    if (stored) {
      return stored as AlphabetLetter;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.settings.minAlphabet, "A");
      return "A";
    }
  });
  const [maxAlphabet, setMaxAlphabet] = useState<AlphabetLetter>(() => {
    const stored = localStorage.getItem(
      LOCAL_STORAGE_KEYS.settings.maxAlphabet
    );
    if (stored) {
      return stored as AlphabetLetter;
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEYS.settings.maxAlphabet, "Z");
      return "Z";
    }
  });
  const [questionTypes, setQuestionTypes] = useState<
    (typeof PracticeQuestionTypes)[number][]
  >(() => {
    const stored = localStorage.getItem(
      LOCAL_STORAGE_KEYS.settings.questionTypes
    );
    if (stored) {
      return JSON.parse(stored) as (typeof PracticeQuestionTypes)[number][];
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.settings.questionTypes,
        JSON.stringify(PracticeQuestionTypes)
      );
      return [...PracticeQuestionTypes];
    }
  });

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <label>Parts of Speech</label>
        <Checkbox
          id="part-of-speech-noun"
          value={partsOfSpeech.includes("noun")}
          onChange={(value) => {
            if (value) {
              setPartsOfSpeech([...partsOfSpeech, "noun"]);
            } else {
              setPartsOfSpeech(partsOfSpeech.filter((part) => part !== "noun"));
            }
          }}
          label="Nouns"
        />
      </div>
      <div>
        <label>Chapter</label>
        <Input
          id="min-chapter"
          type="number"
          value={minChapter.toString()}
          onChange={(value) => setMinChapter(parseInt(value))}
          label="Min"
        />
        <Input
          id="max-chapter"
          type="number"
          value={maxChapter.toString()}
          onChange={(value) => setMaxChapter(parseInt(value))}
          label="Max"
        />
      </div>
      <div>
        <label>Alphabet Range</label>
        <Select
          id="min-alphabet"
          value={minAlphabet}
          onChange={(value) => {
            setMinAlphabet(value as AlphabetLetter);
          }}
          label="Min">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <option
              key={letter}
              value={letter}>
              {letter}
            </option>
          ))}
        </Select>
        <Select
          id="max-alphabet"
          value={maxAlphabet}
          onChange={(value) => {
            setMaxAlphabet(value as AlphabetLetter);
          }}
          label="Max">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => (
            <option
              key={letter}
              value={letter}>
              {letter}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label>Question Types</label>
        {PracticeQuestionTypes.map((type) => (
          <Checkbox
            key={type}
            id={`question-type-${type}`}
            value={questionTypes.includes(type)}
            onChange={(value) => {
              if (value) {
                setQuestionTypes([...questionTypes, type]);
              } else {
                setQuestionTypes(
                  questionTypes.filter((questionType) => questionType !== type)
                );
              }
            }}
            label={type}
          />
        ))}
      </div>
      <div>
        <Button
          onClick={() => {
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.partsOfSpeech,
              JSON.stringify(partsOfSpeech)
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.minChapter,
              minChapter.toString()
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.maxChapter,
              maxChapter.toString()
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.minAlphabet,
              minAlphabet
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.maxAlphabet,
              maxAlphabet
            );
            localStorage.setItem(
              LOCAL_STORAGE_KEYS.settings.questionTypes,
              JSON.stringify(questionTypes)
            );

            setPage("practice");
          }}>
          Practice
        </Button>
      </div>
    </div>
  );
}
