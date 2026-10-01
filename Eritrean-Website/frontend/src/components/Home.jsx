import "../styles/Home.css";
import asmara from "../assets/Asmara-Eritrea.jpg";
export default function Home() {
  return (
    <div className="home-page">
      <header className="title">
        <img src={asmara} />
        <h2>Strength in Numbers</h2>
      </header>
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
        <div className="important-figures">
          {/* Use the unordered list below to insert pictures and text describing each important figure to the communities' head. */}
          {/* <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul> */}
        </div>
      </div>
    </div>
  );
}
