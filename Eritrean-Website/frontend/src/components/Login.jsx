import { useState } from "react";
import "../styles/login.css";
import { FaCheck } from "react-icons/fa";
import { useCsrfToken } from "../hooks/useCsrfToken";
import { useNavigate } from "react-router";
export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const csrftoken = await useCsrfToken();
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      const user = await response.json();
      console.log(user);
      navigate("/");
      setUser(user);
    } catch (error) {
      alert("Invalid username or password");
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login Page</h1>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter a password"
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
