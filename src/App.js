import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CookieGroup from "./components/CookieGroup";
import Cookies from "./components/Cookies";
import CookieBox from "./components/CookieBox";
import Settings from "./components/Settings";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { GlobalContext } from "../src/context/GlobalContext";
import { Input } from "antd";
const { TextArea } = Input;
function App() {
  const { globalData } = useContext(GlobalContext);
  return (
    <Router>
      <Layout>
        <Layout>
          <Sider>
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
          </Sider>
          <Content>
            <Routes>
              <Route path="/cookie-group" element={<CookieGroup />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/cookie-box" element={<CookieBox />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
        </Layout>
        <Footer>
          <TextArea
            rows="15"
            readOnly
            value={JSON.stringify(globalData, null, 2)}
          />
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
