import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Input } from "antd";
const { TextArea } = Input;
const CookieBox = () => {
  const { globalData, updateGlobalData } = useContext(GlobalContext);
  const [boxes, setBoxes] = useState(() => {
    const saved = localStorage.getItem("cookieBoxes");
    return saved ? JSON.parse(saved) : [{ title: "", id: "", description: "" }];
  });

  const addBox = () => {
    setBoxes([...boxes, { title: "", id: "", description: "" }]);
  };

  const removeBox = (index) => {
    const newBoxes = [...boxes];
    newBoxes.splice(index, 1);
    setBoxes(newBoxes);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newBoxes = [...boxes];
    newBoxes[index][name] = value;
    setBoxes(newBoxes);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cookieBoxes", JSON.stringify(boxes));
    updateGlobalData({ cookieBoxes: boxes }); // Update global data
    alert("Cookie Boxes saved!");
  };

  useEffect(() => {
    const savedBoxes = localStorage.getItem("cookieBoxes");
    if (savedBoxes) {
      setBoxes(JSON.parse(savedBoxes));
    }
  }, []);

  return (
    <div>
      <h2>Cookie Boxes</h2>
      <form onSubmit={handleSubmit}>
        {boxes.map((box, index) => (
          <div key={index}>
            <input
              name="title"
              value={box.title}
              onChange={(e) => handleChange(index, e)}
              placeholder="Box Title"
            />
            <input
              name="id"
              value={box.id}
              onChange={(e) => handleChange(index, e)}
              placeholder="Box ID"
            />
            <textarea
              name="description"
              value={box.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Box Description"
            />
            <button type="button" onClick={() => removeBox(index)}>
              Delete Box
            </button>
          </div>
        ))}
        <button type="button" onClick={addBox}>
          Add Box
        </button>
        <button type="submit">Save</button>
      </form>
      <h3>Generated JSON:</h3>
      <TextArea rows="10" readOnly value={JSON.stringify(boxes, null, 2)} />
    </div>
  );
};

export default CookieBox;
