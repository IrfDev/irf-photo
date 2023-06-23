"use client";

import { useEffect, useRef } from "react";

import getMounter from "../../three/example/useMain";

const MainScene = (props: Props) => {
  const divRef = useRef(null);

  const { mountScene, renderer } = getMounter({ element: divRef });

  useEffect(() => {
    if (renderer) {
      mountScene();
    }
  }, [renderer]);

  return (
    <div className="h-screen" ref={divRef}>
      MainScene
    </div>
  );
};

export default MainScene;
