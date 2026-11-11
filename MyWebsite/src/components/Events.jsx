import { FaArrowRight, FaGithub } from "react-icons/fa";
import { projects } from "../assets/projects";

export default function Events() {
  return (
    <section className="content">
      <h2>Selected Projects</h2>
      <p>
        A few recent builds--crafted with a calm dark palette clear hierarchy,
        and micro-
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
      <span className="all_projects">
        <FaGithub className="git_icon" />
        <a target="__blank" href="https://github.com/tg-24/Portfolio.git">
          View All on GitHub
        </a>
        <FaArrowRight className="github" />
      </span>
    </section>
  );
}
