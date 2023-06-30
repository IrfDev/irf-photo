import React, { useEffect, useState } from "react";

export default function () {
  let [viewportWidth, setViewportWidth] = useState<number>(window.innerWidth);
  let [viewportHeight, setViewportHeight] = useState<number>(
    window.innerHeight
  );

  useEffect(() => {
    if (window) {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    }
  }, []);

  return {
    viewportHeight,
    viewportWidth,
  };
}
