import React, {
  MutableRefObject,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import useMountImages from "../hooks/mountImages";
import useMouseMovement from "../hooks/useMouseMovement";
import { gsap } from "gsap";

export type ImageStore = {
  img: HTMLImageElement;
  mesh: THREE.Mesh;
  top: number;
  left: number;
  width: number;
  height: number;
  imageMaterial: THREE.ShaderMaterial;
};

export default ({
  element,
}: {
  element: MutableRefObject<HTMLCanvasElement | null>;
}) => {
  const [time, setTime] = useState<number>(0);

  const animationFunction = function (
    actualTime: any,
    settingTime: (
      a: number
    ) => void | Dispatch<SetStateAction<number>> = () => {},
    newTime = 0
  ) {
    if (!materials || !renderer || !camera || !scene) {
      return;
    }

    setPosition();

    newTime += 0.05;

    settingTime(newTime);

    renderer?.render(scene, camera);

    window.requestAnimationFrame(function (someTime) {
      animationFunction(someTime, setTime, newTime);
    });
  };

  let { mountScene, camera, renderer, scene } = useStartScene({
    element,
    animationFunction,
  });

  const { imageStore, materials, setPosition } = useMountImages({
    element,
    scene,
  });

  useEffect(() => {
    materials.forEach((m) => {
      m.uniforms.time.value = time;
    });
  }, [time, materials]);

  useMouseMovement({ camera, element, scene });

  return { mountScene, renderer };
};
