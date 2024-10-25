import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import {
  Form,
  Input,
  Button,
  Tabs,
  Checkbox,
  Select,
  Divider,
  Row,
  Col,
} from "antd";
import { useMediaQuery } from "react-responsive";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
  const max425 = useMediaQuery({ query: "(max-width: 425px)" });
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved ? JSON.parse(saved) : {};
  });

  const handleSubmit = (values) => {
    localStorage.setItem("settings", JSON.stringify(values));
    updateGlobalData({ settings: values });
    alert("Settings saved!");
  };

  const handleValuesChange = (changedValues, allValues) => {
    setSettings(allValues); // Update settings state on every change
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setSettings(parsedSettings);
      form.setFieldsValue(parsedSettings); // Correctly set saved settings on form
    }
  }, [form]);

  return (
    <div>
      <h2>Settings</h2>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange} // Trigger this function on form value changes
      >
        <Tabs defaultActiveKey="1">
          {/* General Tab */}
          <TabPane tab="General" key="1">
            <Form.Item name="enableMerryllCookie" valuePropName="checked">
              <Checkbox>Enable Merryll Cookie?</Checkbox>
            </Form.Item>
            <Row gutter={16}>
              <Col span={max425 ? 24 : 12}>
                <Form.Item name="cookieName" label="Cookie Name">
                  <Input placeholder="Enter Cookie Name" />
                </Form.Item>
              </Col>
              <Col span={max425 ? 24 : 12}>
                <Form.Item
                  name="cookieExpiration"
                  label="Cookie Expiration (in Days)"
                >
                  <Input placeholder="Enter Cookie Expiration" type="number" />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>

          {/* Floating Bar Tab */}
          <TabPane tab="Floating Bar" key="2">
            <Form.Item name="enableFloatingBar" valuePropName="checked">
              <Checkbox>Enable Floating Bar?</Checkbox>
            </Form.Item>
            <Form.Item name="floatingBarText" label="Floating Bar Text">
              <Input placeholder="Enter Floating Bar Text" />
            </Form.Item>

            <Row gutter={16}>
              <Col span={max425 ? 12 : 6}>
                <Form.Item name="floatingBarBgColor" label="Background ">
                  <Input type="color" />
                </Form.Item>
              </Col>
              <Col span={max425 ? 12 : 6}>
                <Form.Item
                  name="floatingBarHoverBgColor"
                  label="Hover Background"
                >
                  <Input type="color" />
                </Form.Item>
              </Col>
              <Col span={max425 ? 12 : 6}>
                <Form.Item name="floatingBarTextColor" label="Text Color">
                  <Input type="color" />
                </Form.Item>
              </Col>
              <Col span={max425 ? 12 : 6}>
                <Form.Item name="floatingBarHoverTextColor" label="Text Hover">
                  <Input type="color" />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>

          {/* Privacy Policy Tab */}
          <TabPane tab="Privacy Policy" key="3">
            <Row gutter={16}>
              <Col span={max425 ? 24 : 12}>
                <Form.Item name="privacyPolicyPage" label="Privacy Policy Page">
                  <Select placeholder="Select Privacy Policy Page">
                    <Option value="page1">Page 1</Option>
                    <Option value="page2">Page 2</Option>
                    <Option value="page3">Page 3</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={max425 ? 24 : 12}>
                <Form.Item name="privacyPolicyName" label="Privacy Policy Name">
                  <Input placeholder="Enter Privacy Policy Name" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="privacyPolicyText" label="Privacy Policy Text">
              <TextArea rows={4} placeholder="Enter Privacy Policy Text" />
            </Form.Item>
          </TabPane>
        </Tabs>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
      <Divider />
      <h3 style={{ marginBottom: "20px" }}>JSON:</h3>
      <TextArea rows={10} readOnly value={JSON.stringify(settings, null, 2)} />
    </div>
  );
};

export default Settings;
