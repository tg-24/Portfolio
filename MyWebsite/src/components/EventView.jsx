import { projects } from "../assets/projects.jsx";
import { FaExternalLinkAlt, FaTimes, FaGithub } from "react-icons/fa";
import "../styles/EventView.css";

export default function EventView(popUpRef, setPopUp) {
  const eventViews = [];

  projects.map((project, index) =>
    eventViews.push(
      <article className="popup" key={index}>
        <div
          onClick={() => {
            popUpRef.current.style.hidden = true;
            setPopUp(null);
          }}
          className="close"
        >
          <FaTimes />
        </div>
        <div>
          <img src={project.image} />
        </div>
        <div>
          <h2>{project.title}</h2>
          <p className="description">{project.description}</p>
          {project.skills.map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
          <ul className="checks">
            {project.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
          <span className="project_git_links">
            <a target="__blank" href={project.link}>
              <button className="git_links">
                <FaGithub className="git_icon_white" />
                View on GitHub
              </button>
            </a>
          </span>
          <span className="demo_links">
            <button className="demo_buttons">
              Live Demo
              <FaExternalLinkAlt />
            </button>
          </span>
        </div>
      </article>,
    ),
  );

  return eventViews;
}
