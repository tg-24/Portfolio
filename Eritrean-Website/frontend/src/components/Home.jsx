import "../styles/Home.css";
import {
  FaLocationDot,
  FaRegCalendarCheck,
  FaHandHoldingHeart,
  FaArrowRight,
} from "react-icons/fa6";
import { NavLink } from "react-router";
import community from "../assets/community.png";
import culture from "../assets/culture.png";

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
        <div className="location">
          <FaLocationDot></FaLocationDot>
          <span>Asmara, Eritrea</span>
        </div>
      </div>
      <div className="content">
        <div className="purpose">
          <section className="community">
            <img src={community} alt="create a community" />
            <b>Community</b>
            <p>Connect with Eritreans</p>
            <p>near and far.</p>
          </section>
          <section className="culture">
            <img src={culture} alt="embrace our culture and history" />
            <b>Culture</b>
            <p>Preserve and celebrate </p>
            <p>our heritage.</p>
          </section>
          <section className="event">
            {/* <img alt="plan enriching events for the youth and community" /> */}
            <FaRegCalendarCheck className="calendar" />
            <b>Events</b>
            <p>Stay updated on</p>
            <p>gatherings and activities.</p>
          </section>
          <section className="support">
            {/* <img alt="nuture the community" /> */}
            <FaHandHoldingHeart className="hand-heart"></FaHandHoldingHeart>
            <b>Support</b>
            <p>Empower our community for </p>
            <p>future generations.</p>
          </section>
        </div>
        <div className="upcoming-events">
          <div className="upcoming-header">
            <h1>Upcoming Events</h1>
            <NavLink className="events_link" to="Events/">
              View All Events
              <FaArrowRight className="event-arrow"></FaArrowRight>
            </NavLink>
          </div>
          <div className="upcoming-list"></div>
        </div>
        {/* <div className="about_community">
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
        </div> */}
      </div>
    </div>
  );
}
