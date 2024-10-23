import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

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
    updateGlobalData({ cookieGroups: groups }); // Update global data
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
      <form onSubmit={handleSubmit}>
        {groups.map((group, index) => (
          <div key={index}>
            <input
              name="title"
              value={group.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Group Title"
            />
            <input
              name="id"
              value={group.id}
              onChange={(e) => handleChange(index, e)}
              placeholder="Group ID"
            />
            <textarea
              name="description"
              value={group.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Group Description"
            />
            <button type="button" onClick={() => removeGroup(index)}>
              Delete Group
            </button>
          </div>
        ))}
        <button type="button" onClick={addGroup}>
          Add Group
        </button>
        <button type="submit">Save</button>
      </form>
      <h3>Generated JSON:</h3>
      <textarea
        rows="10"
        cols="50"
        readOnly
        value={JSON.stringify(groups, null, 2)}
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

export default CookieGroup;
