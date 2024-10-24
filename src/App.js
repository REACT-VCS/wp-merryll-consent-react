import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import CookieGroup from "./components/CookieGroup";
import Cookies from "./components/Cookies";
import CookieBox from "./components/CookieBox";
import Settings from "./components/Settings";
import { Layout, Input, Menu, Typography } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { GlobalContext } from "../src/context/GlobalContext";

const { TextArea } = Input;
const { Title } = Typography;
function App() {
  const { globalData } = useContext(GlobalContext);
  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ backgroundColor: "#F8F8FF", textAlign: "center" }}>
          <Link to="/">
            <h2 style={{ textTransform: "uppercase" }}>
              Merryll Consent Manager
            </h2>
          </Link>
        </Header>
        <Layout>
          <Sider
            width={"10%"}
            style={{
              backgroundColor: "white",
              padding: "15px",
              overflow: "auto",
            }}
          >
            <Menu
              mode="vertical"
              style={{
                border: "none",
              }}
            >
              <Menu.Item key="1">
                <Link to="/cookie-group">Cookie Group</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/cookies">Cookies</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/cookie-box">Cookie Box</Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content style={{ padding: "30px", overflow: "auto" }} width={"60%"}>
            <Routes>
              <Route path="/" element={<Navigate to="/cookie-group" />} />
              <Route path="/cookie-group" element={<CookieGroup />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/cookie-box" element={<CookieBox />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Content>
          <Sider
            width={"30%"}
            style={{
              backgroundColor: "white",
              padding: "15px",
              paddingTop: "5px",
              overflow: "auto",
            }}
          >
            <Title level={3}>Global JSON:</Title>
            <TextArea
              readOnly
              value={JSON.stringify(globalData, null, 2)}
              style={{ flexGrow: "1", overflow: "auto", height: "95%" }}
            />
          </Sider>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
