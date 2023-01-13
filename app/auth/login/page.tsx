"use client";

import { useState } from "react";
import { login } from "../../../pages/api/requests";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    await login(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Login</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">
        Login
      </button>
    </form>
  );
};
