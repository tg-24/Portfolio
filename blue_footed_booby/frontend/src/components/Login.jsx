import React, { useState } from "react";
import { useLocalAuth } from "../hooks/useLocalAuth";

export const Login = () => {
  const [email, setEmail] = useState("");

  const { login } = useLocalAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.toLowerCase());
  };

  return (
    <div className={"login-prompt"}>
      <h1>CSCode</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Enter Email: </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (e.g., elodie@union.edu)"
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};
