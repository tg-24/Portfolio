import { useState } from "react";
import "../styles/login.css";
import { FaCheck } from "react-icons/fa";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
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

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <div className="input-group">
          <label for="username">Username:</label>
          <input
            value={username}
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="name@email.com"
            required
          />
        </div>
        <div className="input-group">
          <label for="password">Password</label>
          <input
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="******"
            required
          />
        </div>
        <button className="login-button" type="submit">
          <FaCheck className="check-mark"></FaCheck>
        </button>
      </form>
    </div>
  );
}
