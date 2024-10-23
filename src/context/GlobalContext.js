import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [globalData, setGlobalData] = useState(() => {
    const saved = localStorage.getItem("globalSettings");
    return saved ? JSON.parse(saved) : {};
  });

  const updateGlobalData = (newData) => {
    const updatedData = { ...globalData, ...newData };
    setGlobalData(updatedData);
    localStorage.setItem("globalSettings", JSON.stringify(updatedData));
  };

  return (
    <GlobalContext.Provider value={{ globalData, updateGlobalData }}>
      {children}
    </GlobalContext.Provider>
  );
};
