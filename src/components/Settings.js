import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Form, Input, Button, Tabs, Checkbox, Select } from "antd";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const Settings = () => {
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
      form.setFieldsValue(parsedSettings);
    }
  }, [form]);

  return (
    <div>
      <h2>Settings</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        onValuesChange={handleValuesChange} // Trigger this function on form value changes
      >
        <Tabs defaultActiveKey="1">
          {/* General Tab */}
          <TabPane tab="General" key="1">
            <Form.Item
              name="enableMerryllCookie"
              valuePropName="checked"
              label="Enable Merryll Cookie?"
            >
              <Checkbox />
            </Form.Item>

            <Form.Item name="cookieName" label="Cookie Name">
              <Input placeholder="Enter Cookie Name" />
            </Form.Item>

            <Form.Item
              name="cookieExpiration"
              label="Cookie Expiration (in Days)"
            >
              <Input placeholder="Enter Cookie Expiration" type="number" />
            </Form.Item>
          </TabPane>

          {/* Floating Bar Tab */}
          <TabPane tab="Floating Bar" key="2">
            <Form.Item
              name="enableFloatingBar"
              valuePropName="checked"
              label="Enable Floating Bar?"
            >
              <Checkbox />
            </Form.Item>

            <Form.Item name="floatingBarText" label="Floating Bar Text">
              <Input placeholder="Enter Floating Bar Text" />
            </Form.Item>

            <Form.Item
              name="floatingBarBgColor"
              label="Floating Bar Background Color"
            >
              <Input type="color" />
            </Form.Item>

            <Form.Item
              name="floatingBarHoverBgColor"
              label="Floating Bar Hover Background Color"
            >
              <Input type="color" />
            </Form.Item>

            <Form.Item
              name="floatingBarTextColor"
              label="Floating Bar Text Color"
            >
              <Input type="color" />
            </Form.Item>

            <Form.Item
              name="floatingBarHoverTextColor"
              label="Floating Bar Hover Text Color"
            >
              <Input type="color" />
            </Form.Item>
          </TabPane>

          {/* Privacy Policy Tab */}
          <TabPane tab="Privacy Policy" key="3">
            <Form.Item name="privacyPolicyPage" label="Privacy Policy Page">
              <Select placeholder="Select Privacy Policy Page">
                <Option value="page1">Page 1</Option>
                <Option value="page2">Page 2</Option>
                <Option value="page3">Page 3</Option>
              </Select>
            </Form.Item>

            <Form.Item name="privacyPolicyName" label="Privacy Policy Name">
              <Input placeholder="Enter Privacy Policy Name" />
            </Form.Item>

            <Form.Item name="privacyPolicyText" label="Privacy Policy Text">
              <TextArea rows={4} placeholder="Enter Privacy Policy Text" />
            </Form.Item>
          </TabPane>
        </Tabs>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form>

      <h3>Generated JSON:</h3>
      <TextArea rows={10} readOnly value={JSON.stringify(settings, null, 2)} />
    </div>
  );
};

export default Settings;
