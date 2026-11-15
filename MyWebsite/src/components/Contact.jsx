import { FaArrowRight } from "react-icons/fa";
import "../styles/Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <div className="contacts">
        <div>
          <h2>Let's build something together.</h2>
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
