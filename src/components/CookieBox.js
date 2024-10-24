import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Form, Input, Button, Typography } from "antd";

const { TextArea } = Input;
const { Title } = Typography;

const CookieBox = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [generatedJson, setGeneratedJson] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("cookieSettings");
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      form.setFieldsValue(parsedSettings);
      setGeneratedJson(JSON.stringify(parsedSettings, null, 2)); // Set initial JSON from localStorage
    }
  }, [form]);

  const onFinish = (values) => {
    localStorage.setItem("cookieSettings", JSON.stringify(values));
    updateGlobalData({ cookieSettings: values });
    setGeneratedJson(JSON.stringify(values, null, 2)); // Set the generated JSON for display
    alert("Settings saved!");
  };

  return (
    <div>
      <Title level={2}>Cookie Settings</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          topLeftLogo: "",
          topRightText: "",
          topRightTextColor: "",
          topLogoLink: "",
          footerPoweredByText: "",
          poweredByTextColor: "",
          footerPoweredByLink: "",
          consentModalTopTitle: "",
          consentModalTopDescription: "",
          toggleAllTitle: "",
          toggleAllDescription: "",
          headingFontSize: "",
          headingLetterSpacing: "",
          bodyFontSize: "",
          bodyLetterSpacing: "",
          backgroundColor: "",
          textColor: "",
          linkColor: "",
          linkHoverColor: "",
          selectionSwitchOnColor: "",
          dividerColor: "",
          buttonType: "",
          acceptAllText: "",
          acceptSelectedText: "",
          rejectAllText: "",
          saveButtonText: "",
          acceptAllButtonBg: "",
          acceptAllButtonHoverBg: "",
          acceptSelectedButtonBg: "",
          acceptSelectedButtonHoverBg: "",
          rejectAllButtonBg: "",
          rejectAllButtonHoverBg: "",
        }}
      >
        <Form.Item label="Upload Top Left Logo" name="topLeftLogo">
          <Input placeholder="Top Left Logo URL" />
        </Form.Item>

        <Form.Item label="Top Right Text" name="topRightText">
          <Input placeholder="Top Right Text" />
        </Form.Item>

        <Form.Item label="Top Right Text Color" name="topRightTextColor">
          <Input placeholder="Top Right Text Color" />
        </Form.Item>

        <Form.Item label="Top Logo Link" name="topLogoLink">
          <Input placeholder="Top Logo Link" />
        </Form.Item>

        <Form.Item label="Footer Powered By Text" name="footerPoweredByText">
          <Input placeholder="Powered By Text" />
        </Form.Item>

        <Form.Item label="Powered By Text Color" name="poweredByTextColor">
          <Input placeholder="Powered By Text Color" />
        </Form.Item>

        <Form.Item label="Footer Powered By Link" name="footerPoweredByLink">
          <Input placeholder="Footer Powered By Link" />
        </Form.Item>

        <Form.Item label="Consent Modal Top Title" name="consentModalTopTitle">
          <Input placeholder="Consent Modal Top Title" />
        </Form.Item>

        <Form.Item
          label="Consent Modal Top Description"
          name="consentModalTopDescription"
        >
          <TextArea placeholder="Consent Modal Top Description" />
        </Form.Item>

        <Form.Item label="Toggle All On/Off Title" name="toggleAllTitle">
          <Input placeholder="Toggle All On/Off Title" />
        </Form.Item>

        <Form.Item
          label="Toggle All On/Off Description"
          name="toggleAllDescription"
        >
          <TextArea placeholder="Toggle All On/Off Description" />
        </Form.Item>

        <Form.Item label="Heading Font Size" name="headingFontSize">
          <Input placeholder="Heading Font Size" />
        </Form.Item>

        <Form.Item label="Heading Letter Spacing" name="headingLetterSpacing">
          <Input placeholder="Heading Letter Spacing" />
        </Form.Item>

        <Form.Item label="Body Font Size" name="bodyFontSize">
          <Input placeholder="Body Font Size" />
        </Form.Item>

        <Form.Item label="Body Letter Spacing" name="bodyLetterSpacing">
          <Input placeholder="Body Letter Spacing" />
        </Form.Item>

        <Form.Item label="Background Color" name="backgroundColor">
          <Input placeholder="Background Color" />
        </Form.Item>

        <Form.Item label="Text Color" name="textColor">
          <Input placeholder="Text Color" />
        </Form.Item>

        <Form.Item label="Link Color" name="linkColor">
          <Input placeholder="Link Color" />
        </Form.Item>

        <Form.Item label="Link Hover Color" name="linkHoverColor">
          <Input placeholder="Link Hover Color" />
        </Form.Item>

        <Form.Item
          label="Selection Switch On Color"
          name="selectionSwitchOnColor"
        >
          <Input placeholder="Selection Switch On Color" />
        </Form.Item>

        <Form.Item label="Divider Color" name="dividerColor">
          <Input placeholder="Divider Color" />
        </Form.Item>

        <Form.Item label="Button Type" name="buttonType">
          <Input placeholder="Button Type" />
        </Form.Item>

        <Form.Item label="Accept-All Button Text" name="acceptAllText">
          <Input placeholder="Accept-All Button Text" />
        </Form.Item>

        <Form.Item
          label="Accept-Selected Button Text"
          name="acceptSelectedText"
        >
          <Input placeholder="Accept-Selected Button Text" />
        </Form.Item>

        <Form.Item label="Reject-All Button Text" name="rejectAllText">
          <Input placeholder="Reject-All Button Text" />
        </Form.Item>

        <Form.Item label="Save Button Text" name="saveButtonText">
          <Input placeholder="Save Button Text" />
        </Form.Item>

        <Form.Item
          label="Accept-All Button Background Color"
          name="acceptAllButtonBg"
        >
          <Input placeholder="Accept-All Button Background Color" />
        </Form.Item>

        <Form.Item
          label="Accept-All Button Hover Background Color"
          name="acceptAllButtonHoverBg"
        >
          <Input placeholder="Accept-All Button Hover Background Color" />
        </Form.Item>

        <Form.Item
          label="Accept-Selected Button Background Color"
          name="acceptSelectedButtonBg"
        >
          <Input placeholder="Accept-Selected Button Background Color" />
        </Form.Item>

        <Form.Item
          label="Accept-Selected Button Hover Background Color"
          name="acceptSelectedButtonHoverBg"
        >
          <Input placeholder="Accept-Selected Button Hover Background Color" />
        </Form.Item>

        <Form.Item
          label="Reject-All Button Background Color"
          name="rejectAllButtonBg"
        >
          <Input placeholder="Reject-All Button Background Color" />
        </Form.Item>

        <Form.Item
          label="Reject-All Button Hover Background Color"
          name="rejectAllButtonHoverBg"
        >
          <Input placeholder="Reject-All Button Hover Background Color" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Settings
          </Button>
        </Form.Item>
      </Form>

      <h3>Generated JSON:</h3>
      <TextArea rows={10} readOnly value={generatedJson} />
    </div>
  );
};

export default CookieBox;
