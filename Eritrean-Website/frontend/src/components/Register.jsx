import { Link, useLocation } from "react-router";
import { useState } from "react";
import Wreath from "../assets/Wreath.png";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Register.css";

export default function Register() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    username: "",
    email: location.state?.email || "",
    first_name: "",
    last_name: "",
    register_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <p>Create an account to join our community.</p>
        <div className="Wreath_div">
          <img src={Wreath} />
        </div>
        <div>
          Already have an account? <Link to="/login/">Log in</Link>
        </div>
        <form
          className="rForm"
          onSubmit={(e) => e.preventDefault()}
          method="POST"
        >
          <span className="input-groups">
            <label for="username">Username</label>
            <input
              id="username"
              value={formData.username}
              onChange={handleFormChange}
              placeholder="Choose a unique username"
              required
            />
          </span>
          <span className="input-groups">
            <label for="email">Email address</label>
            <input
              onChange={handleFormChange}
              value={formData.email}
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </span>
          <div className="names">
            <span className="input-groups">
              <label for="first_name">First name</label>
              <input
                id="first_name"
                onChange={handleFormChange}
                value={formData.first_name}
                placeholder="First name"
              />
            </span>
            <span className="input-groups">
              <label for="last_name">Last name</label>
              <input
                id="last_name"
                onChange={handleFormChange}
                value={formData.last_name}
                placeholder="Last name"
              />
            </span>
          </div>
          <span className="input-groups">
            {showPassword ? (
              <FaRegEye
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <FaEyeSlash
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
            <label for="password">Password</label>
            <input
              minLength={8}
              id="register_password"
              value={formData.password}
              onChange={handleFormChange}
              type={showPassword ? "text" : "password"}
              placeholder="Choose a password"
              required
            />
          </span>
          <span className="input-groups">
            {showConfirm ? (
              <FaRegEye
                className="eye"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            ) : (
              <FaEyeSlash
                className="eye"
                onClick={() => setShowConfirm(!showConfirm)}
              />
            )}
            <label for="confirm">Confirm password</label>
            <input
              minLength={8}
              id="confirm_password"
              value={formData.confirm_password}
              onChange={handleFormChange}
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password"
              required
            />
          </span>
          <p className="password-rule">
            Your password must be at least 8 characters long.
          </p>
          <button className="register_btn" type="submit">
            Create Account
          </button>
        </form>
        <p>
          By creating an account, you agree to our{" "}
          <a href="">Terms of Serivce</a> and <a href="">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
