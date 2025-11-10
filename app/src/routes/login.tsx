import { Button, Input, Password } from "@liujip0/components";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { LOCAL_STORAGE_KEYS } from "../localstorage.ts";
import { trpc } from "../trpc.ts";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const login = useMutation(
    trpc.user.login.mutationOptions({
      onSuccess(data) {
        if (data) {
          setLoginError("");
          localStorage.setItem(LOCAL_STORAGE_KEYS.api_token, data);
          navigate("/");
        } else {
          setLoginError("Error: Empty response from server");
        }
      },
      onError(error) {
        setLoginError("Error: " + error.message);
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
      <h1>Log In</h1>
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
          login.mutate({ username, password });
        }}>
        Submit
      </Button>
      <p>{loginError}</p>
    </div>
  );
}
