import React, { useState, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const setControls = ({
  camera,
  renderer,
}: {
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
}) => {
  const [controls, setControls] = useState<null | OrbitControls>(null);

  useEffect(() => {
    if (camera) {
      setControls(new OrbitControls(camera, renderer?.domElement));
    }
  }, [camera]);

  return { controls };
};

export default setControls;
