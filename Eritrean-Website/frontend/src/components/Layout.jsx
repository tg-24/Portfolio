import { Outlet, Link } from "react-router";
import "../styles/Layout.css";
import logo from "../assets/logo.png";

export default function Layout() {
  const homePath = "home/";
  return (
    <div className="container">
      <header className="header">
        <div className="logo">
          <Link to={homePath} className="homepath">
            <img className="logo_img" src={logo} alt="Image not Found" />
          </Link>
        </div>
        <div>
          <h3>Eritrean Community</h3>
          <p>People &bull; Culture &bull; Heritage &bull; Unity </p>
        </div>
      </header>
      <Outlet />
    </div>
  );
}
