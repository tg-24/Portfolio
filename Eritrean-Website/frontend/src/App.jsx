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
  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/user/", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("No current user");
        }
        const curr_user = await response.json();
        setUser(curr_user);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    }
    getUser();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="dashboard/" element={<Dashboard />}></Route>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="register/" element={<Register />}></Route>
          <Route path="login/" element={<Login />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
