import { Outlet, Link } from "react-router";
import "../styles/Layout.css";
import logo from "../assets/logo.png";

export default function Layout() {
  const homePath = "home/";
  const tab_list = ["Home", "About", "Events", "Contact"];

  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="logo">
            <Link to={homePath} className="homepath">
              <img className="logo_img" src={logo} alt="Image not Found" />
            </Link>
          </div>
          <div>
            <h3>Eritrean Community</h3>
            <p>People &bull; Culture &bull; Heritage &bull; Unity </p>
          </div>
        </div>
        <div className="tabs">
          {tab_list.map((val, index) => (
            <Link to={val.toLowerCase() + "/"} key={index}>
              <p>{val}</p>
            </Link>
          ))}
        </div>
        <div className="sign_up">
          <button className="register_button">Sign Up</button>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
