import { router } from "../../trpc.ts";
import { wordlist } from "./wordlist.ts";

export const words = router({
  wordlist,
});
