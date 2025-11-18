import { useState } from "react";
import Practice from "./practice.tsx";
import Settings from "./settings.tsx";

export const PracticeQuestionTypes = [
  "english to latin",
  "latin to english",
  "noun declension",
  "noun gender",
] as const;
export default function PracticeIndex() {
  const [page, setPage] = useState<"practice" | "settings">("settings");
  switch (page) {
    case "practice":
      return <Practice setPage={setPage} />;
    case "settings":
      return <Settings setPage={setPage} />;
  }
}
