import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import { useCanvas } from "../../context/CanvasContext";
import "./CanvasComponent.css";
import { usePenTool } from "../../hooks/usePenTool";
import { usePathHandles } from "../../hooks/usePathHandles";

function CanvasComponent() {
  const { isPenToolActive, togglePenTool } = useCanvas();
  const canvasRef = useRef(null);
  const [selectedSegment, setSelectedSegment] = useState({});

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (currentCanvas) {
      if (!currentCanvas.fabric) {
        currentCanvas.fabric = new fabric.Canvas(currentCanvas, {
          height: 600,
          width: 800,
        });
      }
    }

    // Cleanup
    return () => {
      currentCanvas.fabric.dispose();
      currentCanvas.fabric = null;
    };
  }, []);

  usePenTool(canvasRef, setSelectedSegment);
  usePathHandles(canvasRef, selectedSegment);

  return (
    <>
      <div className="canvas-container">
        <canvas ref={canvasRef} />
      </div>
      <button onClick={() => togglePenTool()}>
        Toggle Pen Tool {isPenToolActive ? "ON" : "OFF"}
      </button>
    </>
  );
}

export default CanvasComponent;
