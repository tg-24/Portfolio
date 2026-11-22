import { Link, useLocation } from "react-router";
import { useState } from "react";
import "../styles/Register.css";
export default function Register() {
  const location = useLocation();
  const [email, useEmail] = useState(location.state?.email || "");
  return (
    <div className="register-container">
      <h2>Register</h2>
      <p>
        Already have an account? <Link to="login/">Log in</Link>
      </p>
      <form onSubmit={(e) => e.preventDefault()} method="POST">
        <label for="username">Username</label>
        <input id="username" placeholder="Choose a unique username" required />
        <p>This will be your public name on the site.</p>
        <label for="email">Email address</label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="email"
          type="email"
          placeholder="you@example.com"
          required
        />
        <p>We'll use this to send you important updates.</p>
        <div className="names">
          <div className="first">
            <label for="first_name">First name (optional)</label>
            <input id="first_name" placeholder="First name" />
          </div>
          <div className="last">
            <label for="last_name">Last name (optional)</label>
            <input id="last_name" placeholder="last_name" />
          </div>
        </div>
        <label for="password">Password</label>
        <input
          minLength={8}
          id="password"
          type="password"
          placeholder="Choose a password"
          required
        />
        <p>Your password must be at least 8 characters long.</p>
        <label for="confirm">Confirm password</label>
        <input
          minLength={8}
          id="confirm"
          type="password"
          placeholder="Confirm your password"
          required
        />
        <button type="submit">Create Account</button>
        <p>
          By creating an account, you agree to our{" "}
          <a href="">Terms of Serivce</a> and <a href="">Privacy Policy</a>.
        </p>
      </form>
      <aside></aside>
    </div>
  );
}
