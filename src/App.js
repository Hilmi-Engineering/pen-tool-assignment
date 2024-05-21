import React from "react";
import "./App.css";
import { CanvasProvider } from "./context/CanvasContext";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";

function App() {
  return (
    <CanvasProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
        }}
      >
        <CanvasComponent />
      </div>
    </CanvasProvider>
  );
}

export default App;
