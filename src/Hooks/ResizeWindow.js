import { useState, useEffect } from 'react';

export function useResizeWindow(setMaxEntriesPerPage, setCurrentPage) {
    useEffect(() => {
      function resizeWindow() {
        if (window.innerWidth <= 992) {
          setMaxEntriesPerPage(1);
          setCurrentPage(1);
        } else if (window.innerWidth > 992) {
          setMaxEntriesPerPage(4);
          setCurrentPage(1);
        }
      }
      window.addEventListener("resize", resizeWindow);

      return (_) => {
        window.removeEventListener("resize", resizeWindow);
      };
    });
  }