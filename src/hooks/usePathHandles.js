import { useEffect } from "react";
import { fabric } from "fabric";

export const usePathHandles = (canvasRef, path) => {
  let handlesState = []; // Store the state of the handles
  let handlePairIndex = 0; // Index for handle pairs
  let handleIndex = 0; // Index for individual handles

  useEffect(() => {
    if (!canvasRef) {
      console.log("catches");
      return;
    }
    const canvas = canvasRef.current.fabric;

    // Store references to all handles and lines
    let handles = [];

    // Function to remove all handles and lines from the canvas
    const removeAllHandlesAndLines = () => {
      handles.forEach(({ circleStart, circleEnd, line }) => {
        canvas.remove(circleStart, circleEnd, line);
      });
      handles = []; // Clear the array after removing the objects
    };

    // Function to handle the movement of handles
    const handleMoved = (options) => {
      const { transform, pointer } = options;
      if (transform.target) {
        const boundingBox = transform.target.line.getBoundingRect();

        // Calculate the center point of the bounding box
        const centerX = boundingBox.left + boundingBox.width / 2;
        const centerY = boundingBox.top + boundingBox.height / 2;

        // Get mouse position relative to the canvas
        const mouseX = pointer.x;
        const mouseY = pointer.y;

        // Calculate angle between center point and mouse position
        const angleRad = Math.atan2(mouseY - centerY, mouseX - centerX);

        // Define the radius of the circle path
        const radius = 35;
        const offsetX = Math.cos(angleRad) * radius;
        const offsetY = Math.sin(angleRad) * radius;

        // Calculate new position for the handle on the circle's circumference
        let newX = centerX + offsetX;
        let newY = centerY + offsetY;

        // Set the new position of the handle
        transform.target.set({ left: newX, top: newY });

        // Update the counterpart handle position
        newX = centerX - offsetX;
        newY = centerY - offsetY;
        transform.target.counterpart.set({ left: newX, top: newY });

        const angleDeg = angleRad * (180 / Math.PI);
        transform.target.line.set("angle", angleDeg);

        // Find the corresponding handle object by its ID and update its position
        const handleObj = handlesState.find(
          (h) => h.object.id === transform.target.id
        );

        if (handleObj) {
          handleObj.x = transform.target.left;
          handleObj.y = transform.target.top;
        }

        // Update the path with new control points
        if (transform.target.circleEnd) {
          const pathString = `M ${path.start.x} ${path.start.y} Q ${handleObj.x} ${handleObj.y}, ${path.end.x} ${path.end.y}`;

          // Create a temporary path object with the new path string
          var tempPath = new fabric.Path(pathString);

          // Update the path object with the new path data
          path.segment.set({
            path: tempPath.path,
            fill: "transparent", // Set to 'transparent' to avoid filling the path
            stroke: "blue", // Set the stroke color to blue
            strokeWidth: 2, // Set the stroke width
          });
        }

        canvas.renderAll();
      }
    };

    // Function to create a handle (circle and line)
    const createHandle = (originX, originY, pathAngle, pathAngleRadians) => {
      const line = new fabric.Line(
        [originX - 30, originY, originX + 30, originY],
        {
          stroke: "blue",
          strokeWidth: 2,
          selectable: false,
          originX: "center",
          originY: "center",
          angle: pathAngle,
        }
      );

      // Calculate offsets for handle positions
      let radius = 5;
      let xOffset = (30 + radius) * Math.cos(pathAngleRadians);
      let yOffset = (30 + radius) * Math.sin(pathAngleRadians);

      const circleStart = new fabric.Circle({
        radius: radius,
        fill: "white",
        stroke: "red",
        strokeWidth: 1,
        left: originX + xOffset,
        top: originY + yOffset,
        originX: "center",
        originY: "center",
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        selectable: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        evented: true,
      });

      const circleEnd = new fabric.Circle({
        radius: radius,
        fill: "white",
        stroke: "black",
        strokeWidth: 1,
        left: originX - xOffset,
        top: originY - yOffset,
        originX: "center",
        originY: "center",
        hasBorders: false,
        hasControls: false,
        hasRotatingPoint: false,
        selectable: true,
        lockRotation: true,
        lockScalingX: true,
        lockScalingY: true,
        evented: true,
      });

      circleStart.counterpart = circleEnd;
      circleStart.line = line;

      handlesState.push({
        object: circleStart,
        centerX: originX,
        centerY: originY,
        offsetX: xOffset,
        offsetY: yOffset,
        angle: pathAngle,
      });

      circleEnd.counterpart = circleStart;
      circleEnd.line = line;
      circleEnd.circleEnd = true;

      handlesState.push({
        object: circleEnd,
        centerX: originX,
        centerY: originY,
        offsetX: xOffset,
        offsetY: yOffset,
        angle: pathAngle,
      });

      // Add event listeners to handle movement
      circleStart.on("moving", handleMoved);
      circleEnd.on("moving", handleMoved);

      return {
        circleStart,
        circleEnd,
        line,
      };
    };

    // Function to add new handles to the canvas
    const addNewHandles = () => {
      removeAllHandlesAndLines(); // Clear existing handles and lines

      // Calculate the angle of the path
      const pathAngleRadians = Math.atan2(
        path.end.y - path.start.y,
        path.end.x - path.start.x
      );
      const pathAngle = pathAngleRadians * (180 / Math.PI);

      // Create new handles and lines, then add them to the canvas and store their references
      handlePairIndex++;
      handleIndex = 0;
      handleIndex++;

      const handleStart = createHandle(
        path.start.x,
        path.start.y,
        pathAngle,
        pathAngleRadians
      );
      handleIndex++;
      const handleEnd = createHandle(
        path.end.x,
        path.end.y,
        pathAngle,
        pathAngleRadians
      );

      // Add created objects to the canvas
      canvas.add(
        handleStart.circleStart,
        handleStart.circleEnd,
        handleStart.line
      );
      canvas.add(handleEnd.circleStart, handleEnd.circleEnd, handleEnd.line);

      // Store references for later access or removal
      handles.push(handleStart, handleEnd);
    };

    // Event handler for keydown events
    const handleKeyDown = (e) => {
      // Second condition is to check if the path doesn't exist
      if (e.key === "Shift" && !(Object.keys(path).length === 0)) {
          addNewHandles(); // Draw handles when Shift is pressed
      }
    };

    // Event handler for keyup events
    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        removeAllHandlesAndLines(); // Remove handles when Shift is released
        canvas.renderAll();
      }
    };

    // Add event listeners for keydown and keyup events
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      // Clean up event listeners when the component is unmounted
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [canvasRef, path]);
};
