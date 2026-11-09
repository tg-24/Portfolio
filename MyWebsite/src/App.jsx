import { projects } from "./assets/projects";
import { FaArrowAltCircleRight, FaArrowRight } from "react-icons/fa";
import "./App.css";
import snowypeaks from "./assets/snowypeaks.png";

export default function App() {
  return (
    <div className="container">
      <header className="hero">
        <section>
          <h1>
            Product-focused engineer building fast, <br />
            elegant web experiences.
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
        <aside className="area-container">
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
      <main className="body">
        <section className="content">
          <h2>Selected Projects</h2>
          <p>
            A few recent builds--crafted with a calm dark palette clear
            hierarchy, and micro-
            <br />
            interactions that make the UI feel alive.
          </p>
          <div className="projects">
            {projects.map((proj, index) => (
              <article key={index}>
                <header>
                  <h4>{proj.title}</h4>
                  <div className="circle">
                    <FaArrowRight className="proj_arrow" />
                  </div>
                </header>
                <p>{proj.description}</p>
                <main className="skill_list">
                  {proj.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </main>
              </article>
            ))}
          </div>
        </section>
        <div className="divider"></div>
        <section className="about">
          <aside>
            <img className="snowypeaks" src={snowypeaks} />
          </aside>
          <article>
            <h2>About Me</h2>
          </article>
        </section>
        <div className="divider"></div>
      </main>
    </div>
  );
}
