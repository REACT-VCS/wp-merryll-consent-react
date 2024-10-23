import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

const Settings = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("settings");
    return saved
      ? JSON.parse(saved)
      : { footerLeftText: "", footerRightText: "" };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("settings", JSON.stringify(settings));
    updateGlobalData({ settings }); // Update global data
    alert("Settings saved!");
  };

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="footerLeftText"
          value={settings.footerLeftText}
          onChange={handleChange}
          placeholder="Footer Left Text"
        />
        <input
          name="footerRightText"
          value={settings.footerRightText}
          onChange={handleChange}
          placeholder="Footer Right Text"
        />
        <button type="submit">Save</button>
      </form>
      <h3>Generated JSON:</h3>
      <textarea
        rows="10"
        cols="50"
        readOnly
        value={JSON.stringify(settings, null, 2)}
      />
      <h3>Global JSON:</h3>
      <textarea
        rows="10"
        cols="50"
        readOnly
        value={JSON.stringify(globalData, null, 2)}
      />
    </div>
  );
};

export default Settings;
