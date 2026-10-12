import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import Register from "./components/Register";
import Login from "./components/Login";
import "./App.css";

function App() {
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
