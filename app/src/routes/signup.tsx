import { Button, Input, Password } from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "../trpc.ts";

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [signupError, setSignupError] = useState("");
  const signup = useMutation(
    trpc.user.signup.mutationOptions({
      onSuccess() {
        setSignupError("");
        navigate("/login");
      },
      onError(error) {
        setSignupError("Error: " + error.message);
      },
    })
  );

  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const submitKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      submitButtonRef.current?.click();
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <Input
        id="signup-username"
        value={username}
        onChange={setUsername}
        label="Username"
        onKeyDown={submitKeyDown}
      />
      <Password
        id="signup-password"
        value={password}
        onChange={setPassword}
        label="Password"
        onKeyDown={submitKeyDown}
      />
      <Button
        ref={submitButtonRef}
        onClick={() => {
          signup.mutate({ username, password });
        }}>
        Submit
      </Button>
      <p>{signupError}</p>
    </div>
  );
}
