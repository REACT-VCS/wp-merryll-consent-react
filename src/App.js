import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalContext";
import CookieGroup from "./components/CookieGroup";
import Cookies from "./components/Cookies";
import CookieBox from "./components/CookieBox";
import Settings from "./components/Settings";

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/cookie-group">Cookie Group</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
              <li>
                <Link to="/cookie-box">Cookie Box</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/cookie-group" element={<CookieGroup />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookie-box" element={<CookieBox />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
