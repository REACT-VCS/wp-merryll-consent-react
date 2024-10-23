import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Form, Input, Button, Space, Typography, Divider, Card } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const CookieGroup = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("cookieGroups");
    return saved ? JSON.parse(saved) : [{ title: "", id: "", description: "" }];
  });

  const addGroup = () => {
    setGroups([...groups, { title: "", id: "", description: "" }]);
  };

  const removeGroup = (index) => {
    const newGroups = [...groups];
    newGroups.splice(index, 1);
    setGroups(newGroups);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newGroups = [...groups];
    newGroups[index][name] = value;
    setGroups(newGroups);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cookieGroups", JSON.stringify(groups));
    updateGlobalData({ cookieGroups: groups });
    alert("Cookie Groups saved!");
  };

  useEffect(() => {
    const savedGroups = localStorage.getItem("cookieGroups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  return (
    <div>
      <Title level={2}>Cookie Groups</Title>
      <Divider />

      <Form onSubmitCapture={handleSubmit} layout="vertical">
        {groups.map((group, index) => (
          <Card>
            <div key={index} style={{ marginBottom: "16px" }}>
              <Form.Item label="Group Title">
                <Input
                  name="title"
                  value={group.title}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Group Title"
                />
              </Form.Item>
              <Form.Item label="Group ID">
                <Input
                  name="id"
                  value={group.id}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Group ID"
                />
              </Form.Item>
              <Form.Item label="Group Description">
                <TextArea
                  name="description"
                  value={group.description}
                  onChange={(e) => handleChange(index, e)}
                  placeholder="Group Description"
                  rows={4}
                />
              </Form.Item>
              <div style={{ textAlign: "right" }}>
                <Space style={{ textAlign: "right" }}>
                  <Button
                    danger
                    type="primary"
                    onClick={() => removeGroup(index)}
                  >
                    Delete Group
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
        ))}

        <Space style={{ marginBottom: "16px" }}>
          <Button type="dashed" onClick={addGroup}>
            Add Group
          </Button>
        </Space>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
      <Divider />
      <Title level={3}>Generated JSON:</Title>
      <TextArea rows={10} readOnly value={JSON.stringify(groups, null, 2)} />
    </div>
  );
};

export default CookieGroup;
