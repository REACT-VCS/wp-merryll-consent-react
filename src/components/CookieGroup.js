import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Form,
  Input,
  Button,
  Space,
  Divider,
  Card,
  Collapse,
  Col,
  Row,
} from "antd";

const { TextArea } = Input;
const { Panel } = Collapse;

const CookieGroup = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("cookieGroups");
    // return saved ? JSON.parse(saved) : [{ title: "", id: "", description: "" }];
    return saved ? JSON.parse(saved) : [];
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
      <h2>Cookie Groups</h2>
      <Divider />

      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Collapse>
          {groups.map((group, index) => (
            <Panel
              header={`${(index + 1).toString().padStart(2, "0")} - ${
                group.title || `Group ${index + 1}`
              }`}
              key={index}
              // disabled={groups.length === 1}
              extra={
                <Button
                  danger
                  type="primary"
                  onClick={() => removeGroup(index)}
                >
                  Delete
                </Button>
              }
            >
              <Card>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Group Title">
                      <Input
                        name="title"
                        value={group.title}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Group Title"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Group ID">
                      <Input
                        name="id"
                        value={group.id}
                        onChange={(e) => handleChange(index, e)}
                        placeholder="Group ID"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Group Description">
                  <TextArea
                    name="description"
                    value={group.description}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="Group Description"
                    rows={4}
                  />
                </Form.Item>
              </Card>
            </Panel>
          ))}
        </Collapse>

        <Space
          style={{
            marginTop:
              (globalData?.cookieGroups?.length || groups?.length) > 0 ? 16 : 0,
          }}
        >
          <Button color="primary" variant="outlined" onClick={addGroup}>
            Add
          </Button>
        </Space>
        {(globalData?.cookieGroups?.length || groups?.length) > 0 && (
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
      <TextArea rows={10} readOnly value={JSON.stringify(groups, null, 2)} />
    </div>
  );
};

export default CookieGroup;
