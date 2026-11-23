import headshot from "../assets/Headshot.jpg";
import "../styles/About.css";

export default function About({ about_interests }) {
  return (
    <section className="about">
      <aside>
        <img className="headshot" src={headshot} />
      </aside>
      <article>
        <h2>About Me</h2>
        <p className="description">
          I am a current junior at Union College with years of software
          experience under my belt from working with multiple languages like
          Python, Java, and JavaScript to utilizing frameworks. Namely, React
          and Django to create full-stack projects utilizing backend and
          frontend technology.
        </p>
        <div className="about_interests">
          {about_interests.map((interest, index) => (
            <article key={index}>
              {interest[1]}
              <p>{interest[0]}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
