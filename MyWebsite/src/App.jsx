import { FaDatabase, FaCode, FaLayerGroup } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import "./App.css";

export default function App() {
  let about_interests = [
    ["Full-stack Development", <FaCode />],
    ["Databases & Backend", <FaDatabase />],
    ["Systems & Design", <FaLayerGroup />],
  ];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<Home about_interests={about_interests} />}
          ></Route>
          {/* <Route path="eventView/:str" element={<EventView />}></Route> */}
        </Route>
      </Routes>
    </Router>
  );
}
