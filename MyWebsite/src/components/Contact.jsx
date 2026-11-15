import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <footer className="site-footer">
      <div>
        <h3>Thomas</h3>
        <p>© 2026 Thomas Ghile. All rights reserved.</p>
      </div>

      <div className="footer-links">
        <a href="YOUR_GITHUB_URL">
          <FaGithub />
        </a>
        <a href="YOUR_LINKEDIN_URL">
          <FaLinkedin />
        </a>
        <a href="mailto:YOUR_EMAIL">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
