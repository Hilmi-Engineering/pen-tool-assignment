import React, { createContext, useContext, useState } from "react";

const CanvasContext = createContext();

export function useCanvas() {
  return useContext(CanvasContext);
}

export const CanvasProvider = ({ children }) => {
  const [isPenToolActive, setIsPenToolActive] = useState(false);

  const togglePenTool = () => {
    setIsPenToolActive(!isPenToolActive);
  };

  const value = {
    isPenToolActive,
    togglePenTool
  };

  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
};
