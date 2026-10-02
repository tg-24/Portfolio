import "../styles/Home.css";
export default function Home() {
  return (
    <div className="home-page">
      <div className="home-header">
        <div className="title"></div>
        <div className="description">
          <h1>Strength in Numbers</h1>
          <p>
            A community of Eritreans, connecting a culture of people working
            towards building a brighter future together.
          </p>
        </div>
        <div className="buttons">
          <button className="join">Join our Community</button>
          <button className="learn">Learn More</button>
        </div>
      </div>
      <div className="content">
        <div className="bio">
          <section style={{ color: "white" }}>
            The Eritrean Community based in Malden, MA is a place for Ertirean
            families to feel welcome and to stay connected. Here we host events
            like weekly basketball practices with kids and adults, and
            educational activities like coding classes. We even facilitate high
            school graduation parties as a proper send off as the graduates
            transition into adulthood to support them and make sure they never
            forget where they came from. On Fridays kids and adults feel free to
            stop by our main location next to the Mystic Vally YMCA center. We
            have food and drinks for us all to share.
          </section>
        </div>
        <div className="important-figures"></div>
      </div>
    </div>
  );
}
