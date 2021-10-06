import { useState, useEffect } from "react";

export function useResizeWindow() {
  const [currentWidth, setCurrentWidth] = useState();
  useEffect(() => {
    function resizeWindow() {
        (window.innerWidth <= 992) ?
      setCurrentWidth(true) :
      setCurrentWidth(false) 
    }
    window.addEventListener("resize", resizeWindow);

    return (_) => {
      window.removeEventListener("resize", resizeWindow);
    };
  });

  return currentWidth;
}
