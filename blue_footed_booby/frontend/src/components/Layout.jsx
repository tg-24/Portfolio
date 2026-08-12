import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router";
import { useLocalAuth } from "../hooks/useLocalAuth";
import "../styles/layout.css";

export const Layout = () => {
  const { user, logout } = useLocalAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const homePath = user?.is_teacher
    ? "/instructors/homepage"
    : "/students/homepage";

  return (
    <div>
      <header className="app-header">
        <Link to={homePath} className="app-logo">
          <h1>CSCode</h1>
        </Link>
        <div>
          <span>Logged in as: {user?.name}</span>
          <div>
            <button
              className="back_button"
              onClick={() => navigate(-1)}
              disabled={
                location.pathname == "/instructors/homepage" ||
                location.pathname == "/students/homepage"
              }
            >
              Back Button
            </button>
            <button
              style={{ float: "right" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  );
};
