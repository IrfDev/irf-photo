import * as THREE from "three";
import React, { MutableRefObject, useEffect, useState } from "react";
import { isRefAnElement } from "../../utils/misc";
import getWindowSize from "../../hooks/getWindowSize";

type InitializatorArgs = {
  element: MutableRefObject<null | HTMLElement>;
  animationFunction: FrameRequestCallback;
  sceneArgs?: any[];
  cameraArgs?: any[];
  rendererArgs?: any[];
  withControls?: boolean;
};

export function useStartScene({
  element,
  animationFunction,
  cameraArgs = [],
  rendererArgs = [],
  sceneArgs = [],
  withControls = false,
}: InitializatorArgs) {
  const [scene, setScene] = useState<null | THREE.Scene>(null);

  const [camera, setCamera] = useState<null | THREE.Camera>(null);

  const [renderer, setRenderer] = useState<null | THREE.WebGLRenderer>(null);

  const mountScene = () => {
    if (isRefAnElement(element) && element.current && renderer) {
      // animationFunction(0);
      // renderer.setAnimationLoop(animationFunction);
      // window.requestAnimationFrame(animationFunction);

      animationFunction(0);
    }
  };

  useEffect(() => {
    setScene(new THREE.Scene());
    if (element && element.current) {
      let newCam = new THREE.PerspectiveCamera(
        70,
        element.current.clientWidth / element.current.clientHeight,
        100,
        2000
      );

      newCam.position.z = 600;

      newCam.fov =
        2 * Math.atan(element.current.clientHeight / 2 / 600) * (180 / Math.PI);

      setCamera(newCam);

      let newRenderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      newRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      newRenderer.setSize(
        element.current.clientWidth,
        element.current.clientHeight
      );

      newCam.aspect =
        element.current.clientWidth / element.current.clientHeight;

      newCam.updateProjectionMatrix();

      element?.current?.appendChild(newRenderer.domElement);

      setRenderer(newRenderer);
    }
  }, [element]);

  return {
    scene,
    camera,
    renderer,
    mountScene,
  };
}
