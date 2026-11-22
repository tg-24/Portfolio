import { useState } from "react";
import "../styles/Login.css";
import { FaCheck, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useCsrfToken } from "../hooks/useCsrfToken";
import { useNavigate, NavLink } from "react-router";
export default function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        <h1>Welcome Back</h1>
        <p>
          Login to access events, register, and connect with the Eritrean
          community.
        </p>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <FaEnvelope className="input-icon" />
          <input
            value={username}
            id="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <FaLock className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter your password"

            required
          />
          {showPassword ? (
            <FaEye
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaEyeSlash
              className="visibility"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <button className="login-button" type="submit">
          Log In
        </button>
        <p className="login-link">
          Don't have an account? <NavLink to="/register/">Register</NavLink>
        </p>
      </form>
    </div>
  );
}
