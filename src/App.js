import React, { useContext, useState, useEffect } from "react";
import { Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import CookieGroup from "./components/CookieGroup";
import Cookies from "./components/Cookies";
import CookieBox from "./components/CookieBox";
import Settings from "./components/Settings";
import { Layout, Input, Menu, Button } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { GlobalContext } from "../src/context/GlobalContext";

const { TextArea } = Input;

function App() {
  const { globalData } = useContext(GlobalContext);
  const location = useLocation(); // Get current path
  const [selectedKey, setSelectedKey] = useState("");

  // Update selectedKey based on current path
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/cookie-group":
        setSelectedKey("1");
        break;
      case "/cookies":
        setSelectedKey("2");
        break;
      case "/cookie-box":
        setSelectedKey("3");
        break;
      case "/settings":
        setSelectedKey("4");
        break;
      default:
        setSelectedKey("1"); // Default to Cookie Group
    }
  }, [location.pathname]);

  // Function to handle reset
  const handleReset = () => {
    localStorage.removeItem("cookieGroups");
    localStorage.removeItem("cookieSettings");
    localStorage.removeItem("cookies");
    localStorage.removeItem("globalSettings");
    localStorage.removeItem("settings");
    window.location.reload();
  };

  return (
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
          width={"15%"}
          style={{
            backgroundColor: "white",
            padding: "15px",
            overflow: "auto",
          }}
        >
          <Menu
            mode="vertical"
            style={{ border: "none" }}
            selectedKeys={[selectedKey]} // Set active link
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
        <Content style={{ padding: "30px", overflow: "auto" }} width={"50%"}>
          <Routes>
            <Route path="/" element={<Navigate to="/cookie-group" />} />
            <Route path="/cookie-group" element={<CookieGroup />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/cookie-box" element={<CookieBox />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Content>
        <Sider
          width={"35%"}
          style={{
            backgroundColor: "white",
            padding: "15px",
            paddingTop: "5px",
            overflow: "auto",
          }}
        >
          <div className="globaljsontitlebutton">
            <h3 style={{ marginBottom: "15px", marginTop: "15px" }}>
              Global JSON:
            </h3>
            <Button type="primary" danger onClick={handleReset}>
              Reset
            </Button>
          </div>
          {/* <button onClick={handleReset}>Reset</button> */}
          <TextArea
            readOnly
            value={JSON.stringify(globalData, null, 2)}
            style={{ flexGrow: "1", overflow: "auto", height: "92%" }}
          />
        </Sider>
      </Layout>
    </Layout>
  );
}

export default App;
