import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Layout = () => {
  return (
    <div className="layout">
      <nav className="sidebar">
        <ul>
          <li>
            <Link to="/">Groups</Link>
          </li>
          <li>
            <Link to="/cookies">Cookies</Link>
          </li>
          <li>
            <Link to="/box">Box</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        <Outlet /> {/* Renders the routed content */}
      </main>
    </div>
  );
};

export default Layout;
