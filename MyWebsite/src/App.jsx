import { projects } from "./assets/projects";
import { FaArrowRight } from "react-icons/fa";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <header className="hero">
        <section>
          <h1>
            Building practical software solutions through
            <br /> thoughtful engineering.
          </h1>
          <p className="description">
            I'm a Computer Science student passionate about backend development,
            full-stack applications, and problem-solving. I enjoy designing
            efficient systems, exploring new technologies, and turning complex
            ideas into functional software.
          </p>
          <button className="projects_btn">
            View projects <FaArrowRight className="arrow" />
          </button>
          <button className="contact_btn">Contact</button>
        </section>
        <aside className="interests">
          <p className="focus-header">Focus Areas</p>
          <ul className="focus-list">
            <li>Design systems with crisp tokens</li>
            <li>Fast, accessible UI engineering</li>
            <li>Landing pages that convert</li>
            <li>Dashboards with clarity and depth</li>
          </ul>
        </aside>
      </header>
      <div className="divider"></div>
    </div>
  );
}
