import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Form,
  Input,
  Button,
  Space,
  Divider,
  Card,
  Select,
  Collapse,
  Row,
  Col,
} from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;

const Cookies = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [cookies, setCookies] = useState(() => {
    const saved = localStorage.getItem("cookies");
    // return saved
    //   ? JSON.parse(saved)
    //   : [
    //       {
    //         title: "",
    //         id: "",
    //         description: "",
    //         pattern: "",
    //         group: "",
    //         preSelected: false,
    //         gtm: false,
    //       },
    //     ];
    return saved ? JSON.parse(saved) : [];
  });
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const savedGroups = JSON.parse(localStorage.getItem("cookieGroups")) || [];
    setGroups(savedGroups);
  }, []);

  const addCookie = () => {
    setCookies([
      ...cookies,
      {
        title: "",
        id: "",
        description: "",
        pattern: "",
        group: "",
        preSelected: false,
        gtm: false,
      },
    ]);
  };

  const removeCookie = (index) => {
    const newCookies = [...cookies];
    newCookies.splice(index, 1);
    setCookies(newCookies);
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newCookies = [...cookies];
    newCookies[index][name] = type === "checkbox" ? checked : value;
    setCookies(newCookies);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cookies", JSON.stringify(cookies));
    updateGlobalData({ cookies });
    alert("Cookies saved!");
  };

  return (
    <div>
      <h2>Cookies</h2>
      <Divider />
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Collapse>
          {cookies.map((cookie, index) => (
            <Panel
              header={`${(index + 1).toString().padStart(2, "0")} - ${
                cookie.title || `Cookie ${index + 1}`
              }`}
              key={index}
              // disabled={groups.length === 1}
              extra={
                <Button
                  danger
                  type="primary"
                  onClick={() => removeCookie(index)}
                >
                  Delete
                </Button>
              }
            >
              <Card key={index} style={{ marginBottom: 16 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Cookie Title">
                      <Input
                        name="title"
                        value={cookie.title}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Cookie Title"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Cookie ID">
                      <Input
                        name="id"
                        value={cookie.id}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Cookie ID"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item label="Cookie Description">
                  <TextArea
                    name="description"
                    value={cookie.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Cookie Description"
                    rows={4}
                  />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Cookie Pattern">
                      <Input
                        name="pattern"
                        value={cookie.pattern}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Cookie Pattern"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Select Group">
                      <Select
                        name="group"
                        value={cookie.group}
                        onChange={(value) => {
                          const newCookies = [...cookies];
                          newCookies[index].group = value;
                          setCookies(newCookies);
                        }}
                        placeholder="Select Group"
                      >
                        <Select.Option value="">Select Group</Select.Option>
                        {groups.map((group, i) => (
                          <Select.Option key={i} value={group.title}>
                            {group.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <label>
                    <input
                      style={{ marginRight: "15px" }}
                      type="checkbox"
                      name="preSelected"
                      checked={cookie.preSelected}
                      onChange={(e) => handleChange(index, e)}
                    />
                    Pre-Selected?
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      style={{ marginRight: "15px" }}
                      type="checkbox"
                      name="gtm"
                      checked={cookie.gtm}
                      onChange={(e) => handleChange(index, e)}
                    />
                    Configured via Google Tag Manager?
                  </label>
                </div>
              </Card>
            </Panel>
          ))}
        </Collapse>
        <Space
          style={{
            marginTop:
              (globalData?.cookies?.length || cookies?.length) > 0 ? 16 : 0,
          }}
        >
          <Button color="primary" variant="outlined" onClick={addCookie}>
            Add
          </Button>
        </Space>
        {(globalData?.cookies?.length || cookies?.length) > 0 && (
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "15px" }}
          >
            Save
          </Button>
        )}
      </Form>
      <Divider />
      <h3 style={{ marginBottom: "20px" }}>JSON:</h3>
      <TextArea rows={10} readOnly value={JSON.stringify(cookies, null, 2)} />
    </div>
  );
};

export default Cookies;
