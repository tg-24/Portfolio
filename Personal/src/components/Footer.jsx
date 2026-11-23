import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <h2>Thomas</h2>
      </div>

      <div className="footer-links">
        <a target="__blank" href="https://github.com/tg-24/Portfolio.git">
          <FaGithub />
        </a>
        <a target="__blank" href="https://linkedin.com/in/thomasghile">
          <FaLinkedin />
        </a>
        <a target="_blank" href="mailto:tmghile05@gmail.com">
          <FaEnvelope />
        </a>
      </div>
    </footer>
  );
}
