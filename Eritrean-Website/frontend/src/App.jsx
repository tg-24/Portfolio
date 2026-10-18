/**
 * credentials: "include" — Use whenever you need the browser to send or receive Django cookies. (if auth is SessionAuthentication)
 * X-CSRFToken — Use for requests that modify data, such as POST, PUT, PATCH, and DELETE.
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import { useState, useEffect } from "react";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("http://localhost:8000/api/user/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          setUser(null);
          return;
        } else {
          const curr_user = await response.json();
          setUser(curr_user);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout loading={loading} user={user} setUser={setUser} />}
        >
          <Route index element={<Home />}></Route>
          <Route path="dashboard/" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="register/" element={<Register />}></Route>
          <Route path="login/" element={<Login setUser={setUser} />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
