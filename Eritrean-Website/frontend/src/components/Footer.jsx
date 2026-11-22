import { useNavigate } from "react-router";
import { useState } from "react";
import "../styles/Footer.css";
export default function Footer() {
  const navigate = useNavigate();
  const [email, useEmail] = useState("");
  return (
    <footer className="page-footer">
      <div className="text">
        <h1>Stay Connected</h1>
        <p>
          Get the latest updates on events, news, and community initiatives.
        </p>
      </div>
      <div className="subscribe">
        <input
          onChange={(e) => useEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Your email address"
        />
        <button
          id="sub_btn"
          onClick={() => navigate("/register/", { state: { email: email } })}
        >
          Subscribe
        </button>
      </div>
    </footer>
  );
}
