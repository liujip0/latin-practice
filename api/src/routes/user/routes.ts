import { router } from "../../trpc.ts";
import { checklogin } from "./checklogin.ts";
import { login } from "./login.ts";
import { signup } from "./signup.ts";

export const user = router({
  checklogin,
  login,
  signup,
});
