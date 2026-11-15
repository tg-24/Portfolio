import { FaArrowRight } from "react-icons/fa";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer">
        <div>
          <h2 className="">Let's build something together.</h2>
          <p className="description">
            I'm open to internship opportunities, research, and collaborative
            projects.
          </p>
        </div>
        <a href="https://linkedin.com/in/thomasghile" target="__blank">
          <button className="projects_btn">
            Contact me <FaArrowRight className="arrow" />
          </button>
        </a>
      </div>
    </div>
  );
}
