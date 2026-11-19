import { FaArrowRight, FaGithub } from "react-icons/fa";
import { projects } from "../assets/projects";
import EventView from "./EventView.jsx";
import { useState, useEffect, useRef } from "react";

export default function Events() {
  const [popUp, setPopUp] = useState(null);
  const [demo, setDemo] = useState(null);
  const popUpRef = useRef(null);

  let eventViews = EventView(popUpRef, setPopUp, setDemo);
  useEffect(() => {
    if (popUp) {
      popUpRef.current.style.position = "fixed";
      popUpRef.current.style.top = "50%";
      popUpRef.current.style.left = "50%";
      popUpRef.current.style.transform = "translate(-50%, -50%)";
      document.body.style.overflowY = "hidden";
    }
    if (popUp == null) {
      document.body.style.overflow = "";
    }
  }, [popUp]);

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
          <article
            onClick={() => {
              setPopUp(eventViews[index]);
            }}
            key={index}
          >
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
      {popUp && (
        <>
          <div className="popup-overlay" />
          <div className="popup-contain" ref={popUpRef}>
            {popUp}
          </div>
        </>
      )}
      {demo && (
        <div className="video_popup">
          <button onClick={() => setDemo(false)}>✕</button>
          <video controls width="100%">
            <source src={demo} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      )}
    </section>
  );
}
