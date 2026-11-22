"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUserContext } from "@/context/UserContext";
import { findUser } from "@/data/users";

export function LoginForm() {
  const { setUser } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const matchedUser = findUser(username, password);

    if (!matchedUser) {
      setError("That username and password don't match.");
      return;
    }

    setError(null);
    setUser(matchedUser);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Username</span>
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          required
        />
      </label>

      <label className="field">
        <span>Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          required
        />
      </label>

      {error && <p className="error" role="alert">{error}</p>}

      <button type="submit" className="button-primary">
        Log in
      </button>

      <div className="demo-accounts">
        <p className="hint">Demo accounts</p>
        <ul className="demo-list">
          <li>Idun / letscook123</li>
          <li>Balder / letsbake456</li>
          <li>Freja / letseat789</li>
        </ul>
      </div>
    </form>
  );
}
