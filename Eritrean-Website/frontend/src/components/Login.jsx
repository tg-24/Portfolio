import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(" http://127.0.0.1:8000/api/login/", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const user_token = await response.json();

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  <form onSubmit={handleSubmit}>
    <label for="username">Username:</label>
    <input
      value={username}
      id="username"
      onChange={(e) => {
        setUsername(e.target.value);
      }}
      required
    />
    <label for="password">Password</label>
    <input
      value={password}
      id="password"
      onChange={(e) => {
        setPassword(e.target.value);
      }}
      required
    />
    <button className="login_button" type="submit">
      Login
    </button>
  </form>;
}
