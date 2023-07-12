import React, { useState, useEffect, MutableRefObject } from "react";
import * as THREE from "three";

import { getElementSize } from "../utils/canvasElementFunctions";

type MouseMovementHookArgs = {
  element: MutableRefObject<HTMLCanvasElement>;
  scene: THREE.Scene | null;
  camera: THREE.Camera | null;
};

const useMouseMovement = ({
  element,
  scene,
  camera,
}: MouseMovementHookArgs) => {
  const [raycaster] = useState<THREE.Raycaster>(new THREE.Raycaster());
  const [mouse] = useState<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    element?.current?.parentElement?.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        if (!camera || !scene) {
          return;
        }

        let { width, height, top } = getElementSize(element);

        let mouseX = (event.clientX / width) * 2 - 1;

        let mouseY = -((event.offsetY - top) / height) * 2 + 1;

        mouse.setX(mouseX);
        mouse.setY(mouseY);

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);

        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 0) {
          let obj: any = intersects[0].object;

          if (obj.material) {
            obj.material.uniforms.hover.value = intersects[0].uv;
          }
        }
      },
      false
    );
  }, [element, scene, camera]);

  return {
    raycaster,
    mouse,
  };
};

export default useMouseMovement;
