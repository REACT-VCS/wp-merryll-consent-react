import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Input } from "antd";
const { TextArea } = Input;
const Cookies = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [cookies, setCookies] = useState(() => {
    const saved = localStorage.getItem("cookies");
    return saved
      ? JSON.parse(saved)
      : [
          {
            title: "",
            id: "",
            description: "",
            pattern: "",
            group: "",
            preSelected: false,
            gtm: false,
          },
        ];
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
    updateGlobalData({ cookies }); // Update global data
    alert("Cookies saved!");
  };

  return (
    <div>
      <h2>Cookies</h2>
      <form onSubmit={handleSubmit}>
        {cookies.map((cookie, index) => (
          <div key={index}>
            <input
              name="title"
              value={cookie.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Cookie Title"
            />
            <input
              name="id"
              value={cookie.id}
              onChange={(e) => handleChange(index, e)}
              placeholder="Cookie ID"
            />
            <textarea
              name="description"
              value={cookie.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Cookie Description"
            />
            <input
              name="pattern"
              value={cookie.pattern}
              onChange={(e) => handleChange(index, e)}
              placeholder="Cookie Pattern"
            />
            <select
              name="group"
              value={cookie.group}
              onChange={(e) => handleChange(index, e)}
            >
              <option value="">Select Group</option>
              {groups.map((group, i) => (
                <option key={i} value={group.title}>
                  {group.title}
                </option>
              ))}
            </select>
            <label>
              Pre-Selected?
              <input
                type="checkbox"
                name="preSelected"
                checked={cookie.preSelected}
                onChange={(e) => handleChange(index, e)}
              />
            </label>
            <label>
              Configured via Google Tag Manager?
              <input
                type="checkbox"
                name="gtm"
                checked={cookie.gtm}
                onChange={(e) => handleChange(index, e)}
              />
            </label>
            <button type="button" onClick={() => removeCookie(index)}>
              Delete Cookie
            </button>
          </div>
        ))}
        <button type="button" onClick={addCookie}>
          Add Cookie
        </button>
        <button type="submit">Save</button>
      </form>
      <h3>Generated JSON:</h3>
      <TextArea rows="10" readOnly value={JSON.stringify(cookies, null, 2)} />
    </div>
  );
};

export default Cookies;
