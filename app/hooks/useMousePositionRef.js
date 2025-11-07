import { useEffect, useRef } from "react";

export const useMousePositionRef = (containerRef) => {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const relativeX = x - rect.left;
        const relativeY = y - rect.top;

        if (relativeX >= 0 && relativeX <= rect.width && relativeY >= 0 && relativeY <= rect.height) {
          positionRef.current = { x: relativeX, y: relativeY };
        }
      }
    };

    const handleMouseMove = (ev) => {
      updatePosition(ev.clientX, ev.clientY);
    };

    const handleTouchMove = (ev) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0];
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Center within the container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      updatePosition(rect.left + rect.width - rect.width / 4 , rect.top + rect.height / 2);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
};