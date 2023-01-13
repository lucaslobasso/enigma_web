"use client";
import { useState } from "react";
import { register } from "../../../pages/api/requests";

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    await register(email, password);
  };

  return (
    <form onSubmit={onSubmit}>
      <h3>Register</h3>
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
        Register
      </button>
    </form>
  );
};
