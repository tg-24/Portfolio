import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <header className="hero">
      <section>
        <h1>
          Building reliable systems and meaningful
          <br /> software solutions.
        </h1>
        <p className="description">
          I'm a Computer Science student passionate about backend development,
          full-stack applications, and problem-solving. I enjoy designing
          efficient systems, exploring new technologies, and turning complex
          ideas into functional software.
        </p>
        <button
          className="projects_btn"
          onClick={() =>
            document.querySelector(".content").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          View projects <FaArrowRight className="arrow" />
        </button>
        <button
          className="contact_btn"
          onClick={() =>
            document.querySelector(".contacts").scrollIntoView({
              behavior: "smooth",
            })
          }
        >
          Contact
        </button>
      </section>
      <aside className="area-container">
        <p className="focus-header">Focus Areas</p>
        <ul className="focus-list">
          <li>
            <p>Full-Stack Development</p> — Building responsive interfaces and
            connecting them to robust backend services.
          </li>
          <li>
            <p>Backend Engineering</p> — Designing APIs, implementing
            application logic, and developing scalable server-side systems.
          </li>
          <li>
            <p>Software Engineering & Problem Solving</p> — Applying data
            structures, algorithms, and programming principles to develop
            efficient solutions to complex problems.
          </li>
          <li>
            <p>Databases & Data Management</p> — Working with relational
            databases to organize, retrieve, and manage data efficiently.
          </li>
        </ul>
      </aside>
    </header>
  );
}
