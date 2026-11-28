import { Outlet, Link, NavLink, useNavigate } from "react-router";
import "../styles/Layout.css";
import logo from "../assets/logo.png";
import { useCsrfToken } from "../hooks/useCsrfToken";
import {
  FaRegUser,
  FaChevronDown,
  FaCalendar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Layout({ user, setUser, loading }) {
  const homePath = "";
  const tab_list = ["Home", "About", "Events", "Community", "Contact"];

  let navigate = useNavigate();
  window.scrollTo(0, 0);

  async function handleLogout() {
    const csrfToken = await useCsrfToken();
    const response = await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    });
    let message = await response.json();
    console.log(message);
    navigate("login/");
    setUser(null);
  }

  return (
    <div className="container">
      <header className="header">
        <div className="logo_name_container">
          <div className="logo">
            <Link to={homePath} className="homepath">
              <img className="logo_img" src={logo} alt="Image not Found" />
            </Link>
          </div>
          <div className="community_title">
            <h2>Eritrean Community</h2>
          </div>
        </div>
        <div className="tabs">
          {tab_list.map((val, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "inactive")}
              to={val == "Home" ? "" : val.toLowerCase() + "/"}
              key={index}
            >
              <p>{val}</p>
            </NavLink>
          ))}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <div className="overview">
            <div
              className="account"
              onClick={(e) => e.currentTarget.classList.toggle("active")}
            >
              <FaRegUser />
              <FaChevronDown />
            </div>
            <div className="account-dropdown">
              <div>
                <span className="circle">
                  <FaRegUser className="user_img" />
                </span>
                <span>
                  <h3>{user.username}</h3>
                  <p>Community member</p>
                </span>
              </div>
              <div className="divider"></div>
              <div className="dropdown">
                <div>
                  <FaRegUser className="user_img" />
                  <p>My Profile</p>
                </div>
                <div>
                  <FaCalendar />
                  <p>My Events</p>
                </div>
                <div>
                  <FaCog />
                  <p>Account Settings</p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="logout_container" onClick={handleLogout}>
                <FaSignOutAlt />
                <p>Log out</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="register_login">
            <Link to={{ pathname: "login/" }}>Log in</Link>
            <Link to={{ pathname: "register/" }}>
              <button className="register_button">Register</button>
            </Link>
          </div>
        )}
      </header>
      <main className="component-container">
        <Outlet />
      </main>
    </div>
  );
}
