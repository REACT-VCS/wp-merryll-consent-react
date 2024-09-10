import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Groups from "./pages/Groups";
import Cookies from "./pages/Cookies";
import Box from "./pages/Box";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Groups />} />
          <Route path="cookies" element={<Cookies />} />
          <Route path="box" element={<Box />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
