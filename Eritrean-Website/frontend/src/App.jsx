import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";

import NotFound from "./components/NotFound";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="" element={<Home />}></Route>
        <Route path="/dashboard/" element={<Dashboard />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
