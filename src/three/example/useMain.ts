import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import fragment from "../shader/fragmet.glsl";
import vertex from "../shader/vertex.glsl";

export default ({ element }: any) => {
  const [geometry] = useState(new THREE.PlaneGeometry(0.5, 0.5, 10, 10));

  const [material] = useState(
    new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
    })
  );

  const [mesh, setMesh] = useState<THREE.Mesh>(
    new THREE.Mesh(geometry, material)
  );

  let { mountScene, camera, renderer, scene } = useStartScene({
    element,
    animationFunction: (time) => {
      // mesh.rotation.x = time / 2000;
      // mesh.rotation.y = time / 1000;

      renderer?.render(scene, camera);
    },
  });

  useEffect(() => {
    if (scene) {
      scene?.add(mesh);
    }
  }, [scene]);

  return { mountScene, camera, scene, mesh, material, renderer };
};
