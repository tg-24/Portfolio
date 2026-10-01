import { Outlet, Link, NavLink } from "react-router";
import { useState } from "react";
import "../styles/Layout.css";
import logo from "../assets/logo.png";

export default function Layout() {
  const homePath = "";
  const tab_list = ["Home", "About", "Events", "Community", "Contact"];

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
            <p>People &bull; Culture &bull; Heritage &bull; Unity </p>
          </div>
        </div>
        <div className="tabs">
          {tab_list.map((val, index) => (
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to={val == "Home" ? "" : val.toLowerCase() + "/"}
              key={index}
            >
              <p>{val}</p>
            </NavLink>
          ))}
        </div>
        <div className="sign_up">
          <button className="register_button">Sign Up</button>
        </div>
      </header>
      <main>
        <Outlet className="bg-color:green" />
      </main>
      <footer className="footer"></footer>
    </div>
  );
}
