import Hero from "./Hero.jsx";
import About from "./About.jsx";
import Events from "./Events.jsx";
import Footer from "./Footer.jsx";
import Contact from "./Contact.jsx";

export default function Home({ about_interests }) {
  return (
    <div className="container">
      <Hero />
      <div className="divider"></div>
      <main className="body">
        <About about_interests={about_interests} />
        <div className="divider"></div>
        <Events />
        <div className="divider"></div>
        <Contact />
        <div className="divider"></div>
        <Footer />
      </main>
    </div>
  );
}
