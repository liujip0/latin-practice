import { router } from "../../trpc.ts";
import { addnoun } from "./addnoun.ts";

export const db = router({
  addnoun,
});
