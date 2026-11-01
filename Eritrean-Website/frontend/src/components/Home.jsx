import "../styles/Home.css";
import { useState, useEffect } from "react";
import {
  FaLocationDot,
  FaRegCalendarCheck,
  FaHandHoldingHeart,
  FaArrowRight,
  FaClock,
} from "react-icons/fa6";
import { NavLink } from "react-router";
import community from "../assets/community.png";
import culture from "../assets/culture.png";
import about from "../assets/about.png";

export default function Home() {
  const [eventList, setEventList] = useState(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  function NoEvents() {
    return <div className="no-events">No current events listed.</div>;
  }

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/event/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setEventList(null);
          return;
        }
        const events = await response.json();
        for (let i of events.events) {
          i.start_time = new Date(i.start_time);
          i.end_time = new Date(i.end_time);
        }
        setEventList(events.events);
      } catch (error) {
        console.error(error);
      }
    };
    getEvents();
  }, []);

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
          <div className="upcoming-list">
            {eventList ? (
              eventList.map((event, val) => (
                <article key={val} className="event-article">
                  <div id="event-image">
                    <img
                      src={"http://localhost:8000" + event.image}
                      alt="Not found image"
                    />
                  </div>
                  <span className="overall-details">
                    <section className="dates">
                      <div className="date-details">
                        <p>{months[event.start_time.getMonth()]}</p>
                        <h2>
                          {String(event.start_time.getDate()).padStart(2, "0")}
                        </h2>
                      </div>
                    </section>
                    <section className="details">
                      <h3 className="event-title">{event.title}</h3>
                      <span className="event-location">
                        <FaLocationDot className="fa-dot" />
                        {event.location}
                      </span>
                      <span className="time">
                        <FaClock className="fa-clock" />
                        {event.start_time.toLocaleTimeString("en-US", {
                          timeStyle: "short",
                        })}
                        -
                        {event.end_time.toLocaleTimeString("en-US", {
                          timeStyle: "short",
                        })}
                      </span>
                    </section>
                  </span>
                </article>
              ))
            ) : (
              <NoEvents />
            )}
          </div>
        </div>
        <div className="about_community">
          <img src={about} />
          <div className="about-content">
            <h1>About our Community</h1>
            <section>
              The Eritrean Community based in Malden, MA is a place for Ertirean
              families to feel welcome and to stay connected. Here we host
              events like weekly basketball practices with kids and adults, and
              educational activities like coding classes. We even facilitate
              high school graduation parties as a proper send off as the
              graduates transition into adulthood to support them and make sure
              they never forget where they came from. On Fridays kids and adults
              feel free to stop by our main location next to the Mystic Vally
              YMCA center. We have food and drinks for us all to share.
            </section>
            <NavLink to="register/">
              <button className="about-story">Our Story</button>
              <button className="about-signup">Get Involved</button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
