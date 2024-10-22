import React, { useState } from "react";

const Groups = ({ setFormData }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    group: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData(formValues); // Pass form data to the parent via setFormData
  };

  return (
    <div>
      <h1>Group Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Group: </label>
          <input
            type="text"
            name="group"
            value={formValues.group}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Groups;
