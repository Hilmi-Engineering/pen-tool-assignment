import { useEffect, useState, useCallback, useRef } from "react";
import { fabric } from "fabric";
import { useCanvas } from "../context/CanvasContext";

// Hook to replicate the pen tool from Illustrator
export const usePenTool = (canvasRef, handleSelectSegment) => {
  const { isPenToolActive } = useCanvas(); // Get the pen tool active state from context
  const points = useRef([]); // Reference to store points for the path
  const isShiftPressed = useRef(false); // Reference to track if the Shift key is pressed

  // Function to draw or update the last segment as a path
  const drawOrUpdateLastSegment = useCallback(() => {
    const canvasInstance = canvasRef.current.fabric;
    if (!canvasInstance || points.current.length < 2) return;

    // Get the last two points to form a segment
    const start = points.current[points.current.length - 2];
    const end = points.current[points.current.length - 1];

    // Create a simple line path for the new segment
    const pathString = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    const newPath = new fabric.Path(pathString, {
      stroke: "#000000",
      strokeWidth: 2,
      selectable: false,
      evented: true, // Allow the path to be evented for future adjustments
    });

    // Attach event listener for segment selection
    newPath.on("mousedown", function (options) {
      handleSelectSegment({ segment: this, start: start, end: end }); // Handle selection for possible adjustments
      options.e.preventDefault(); // Optional: Prevent default behavior
      options.e.stopPropagation(); // Optional: Stop event propagation
    });

    // Add the new path segment to the canvas
    canvasInstance.add(newPath);
  }, [canvasRef, handleSelectSegment]);

  // Function to finalize and merge all segments into a single path
  const finalizePath = useCallback(() => {
    const canvasInstance = canvasRef.current.fabric;
    if (!canvasInstance || points.current.length <= 1) return;

    // Create the complete path string by reducing the points array
    const pathString = points.current.reduce(
      (acc, point, i) =>
        acc +
        (i === 0 ? `M ${point.x} ${point.y}` : ` L ${point.x} ${point.y}`),
      ""
    );

    // Create the complete path object
    const completePath = new fabric.Path(pathString, {
      stroke: "black",
      fill: "transparent",
      strokeWidth: 2,
      selectable: false,
      evented: false,
    });

    // Add the complete path to the canvas
    canvasInstance.add(completePath);
    points.current = []; // Reset points after finalizing the path
  }, [canvasRef]);

  // Effect to handle canvas interactions and key events
  useEffect(() => {
    const canvasInstance = canvasRef.current.fabric;
    if (!canvasInstance || !isPenToolActive) return;

    // Mouse down event handler to add points and draw/update segments
    const handleMouseDown = (options) => {
      const pointer = canvasInstance.getPointer(options.e);
      points.current.push(pointer);
      drawOrUpdateLastSegment();
    };

    // Add the mouse down event listener to the canvas
    canvasInstance.on("mouse:down", handleMouseDown);

    // Key down event handler to track Shift key state
    const handleKeyDown = (event) => {
      if (event.key === "Shift") {
        isShiftPressed.current = true;
      }
    };

    // Key up event handler to finalize the path when Shift is released
    const handleKeyUp = (event) => {
      if (event.key === "Shift") {
        isShiftPressed.current = false;
        finalizePath(); // Finalize path when Shift is released
      }
    };

    // Add event listeners for key down and key up events
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Clean up event listeners when the component is unmounted
    return () => {
      canvasInstance.off("mouse:down", handleMouseDown);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPenToolActive, drawOrUpdateLastSegment, finalizePath]);
};
