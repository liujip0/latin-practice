import type { Word } from "@latin-practice/api/src/dbtypes.ts";
import { Checkbox } from "@liujip0/components";
import { useState } from "react";

export default function Practice() {
  const [partsOfSpeech, setPartsOfSpeech] = useState<Word["part_of_speech"][]>([
    "noun",
  ]);

  return (
    <div>
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
      </div>
    </div>
  );
}
