import * as THREE from "three";
import React, { MutableRefObject, useEffect, useState } from "react";
import { isRefAnElement } from "../../utils/misc";

type InitializatorArgs = {
  element: MutableRefObject<null | HTMLElement>;
  animationFunction: XRFrameRequestCallback;
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
      if (camera) {
        camera.position.z = 1;
      }
      renderer.setSize(
        element.current.clientWidth,
        element.current.clientHeight
      );

      renderer.setAnimationLoop(animationFunction);
      element?.current?.appendChild(renderer.domElement);
    }
  };

  useEffect(() => {
    if (element && element.current) {
      let newCam = new THREE.PerspectiveCamera(
        75,
        element.current.clientWidth / element.current.clientHeight,
        0.1,
        10
      );

      setCamera(newCam);
    }

    setScene(new THREE.Scene());

    setRenderer(new THREE.WebGLRenderer({ antialias: true }));

    return () => {
      scene?.remove();
      camera?.remove();
    };
  }, [element]);

  return {
    scene,
    camera,
    renderer,
    mountScene,
  };
}
