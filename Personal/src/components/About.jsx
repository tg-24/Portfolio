import snowypeaks from "../assets/snowypeaks.png";

export default function About({ about_interests }) {
  return (
    <section className="about">
      <aside>
        <img className="snowypeaks" src={snowypeaks} />
      </aside>
      <article>
        <h2>About Me</h2>
        <p className="description">
          I'm a junior Computer Science student who enjoys turning ideas into
          reliable, user-friendly software. I'm especially interested in backend
          systems, databases, and building full-stack web applications that
          solve real problems.
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
