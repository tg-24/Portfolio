import { projects } from "../assets/projects.jsx";
import { FaExternalLinkAlt, FaTimes, FaGithub, FaCheck } from "react-icons/fa";
import "../styles/EventView.css";

export default function EventView(popUpRef, setPopUp, setDemo) {
  const eventViews = [];

  projects.map((project, index) =>
    eventViews.push(
      <article className="popup" key={index}>
        <div
          onClick={() => {
            popUpRef.current.hidden = true;
            setPopUp(null);
          }}
          className="close"
        >
          <FaTimes />
        </div>
        <div className="popup-container">
          <div>
            <img src={project.image} />
          </div>
          <div>
            <h2>{project.title}</h2>
            <p className="description">{project.description}</p>
            <div className="skills">
              {project.skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
            <ul className="checks">
              {project.bullets.map((bullet, index) => (
                <li key={index}>
                  <FaCheck />
                  {bullet}
                </li>
              ))}
            </ul>
            <div className="popup_btns">
              <span className="project_git_links">
                <a target="__blank" href={project.link}>
                  <button className="git_btn">
                    <FaGithub className="git_icon_white" />
                    View on GitHub
                  </button>
                </a>
              </span>
              <span className="demo_links">
                <button
                  className="demo_btn"
                  onClick={() => {
                    setDemo(project.video);
                    setPopUp(null);
                  }}
                >
                  Live Demo
                  <FaExternalLinkAlt />
                </button>
              </span>
            </div>
          </div>
        </div>
      </article>,
    ),
  );

  return eventViews;
}
