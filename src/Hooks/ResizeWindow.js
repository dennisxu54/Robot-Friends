import { useState, useEffect } from "react";

export function useResizeWindow() {
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    function resizeWindow() {
      setCurrentWidth(window.innerWidth);
    }
    window.addEventListener("resize", resizeWindow);

    return (_) => {
      window.removeEventListener("resize", resizeWindow);
    };
  });

  return currentWidth;
}
