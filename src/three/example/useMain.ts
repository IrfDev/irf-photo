import React, { MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import useMountImages from "../hooks/mountImages";
import useMouseMovement from "../hooks/useMouseMovement";

export type ImageStore = {
  img: HTMLImageElement;
  mesh: THREE.Mesh;
  top: number;
  left: number;
  width: number;
  height: number;
};

export default ({
  element,
}: {
  element: MutableRefObject<HTMLCanvasElement>;
}) => {
  const [time, setTime] = useState<number>(0);

  const animationFunction = () => {
    if (!materials || !renderer || !camera || !scene) {
      return;
    }

    setTime(time + 0.5);

    setPosition();

    materials.forEach((m) => {
      m.uniforms.time.value = time + 0.5;
    });

    renderer?.render(scene, camera);
    window.requestAnimationFrame(animationFunction);
  };

  let { mountScene, camera, renderer, scene } = useStartScene({
    element,
    animationFunction,
  });

  const { imageStore, materials, setPosition } = useMountImages({
    element,
    scene,
  });

  useMouseMovement({ camera, element, scene });

  return { mountScene, renderer };
};
