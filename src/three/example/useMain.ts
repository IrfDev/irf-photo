import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import fragment from "../shader/fragmet.glsl";
import vertex from "../shader/vertex.glsl";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import LavaTexture from "../../assets/lava.jpg";

import getGalleryCardImages from "../../hooks/getGalleryCardImages";

export default ({ element }: any) => {
  const [geometry, setGeometry] = useState<null | THREE.PlaneGeometry>(null);

  const [material, setMaterial] = useState<null | THREE.ShaderMaterial>(null);

  const [controls, setControls] = useState<null | OrbitControls>(null);

  const [mesh, setMesh] = useState<THREE.Mesh | null>(null);

  const { cardImages } = getGalleryCardImages();

  useEffect(() => {
    first;

    return () => {
      second;
    };
  }, [cardImages]);

  const animationFunction = (time: number) => {
    time += 0.05;
    if (!material || !renderer || !camera || !scene) {
      return;
    }
    material.uniforms.time.value = time;

    renderer?.render(scene, camera);
    // window.requestAnimationFrame(animationFunction);
  };

  let { mountScene, camera, renderer, scene } = useStartScene({
    element,
    animationFunction,
  });

  useEffect(() => {
    if (!material) {
      var someMaterial: any = new THREE.MeshNormalMaterial();
      someMaterial = new THREE.ShaderMaterial({
        side: THREE.DoubleSide,
        fragmentShader: fragment,
        vertexShader: vertex,
        wireframe: true,
        uniforms: {
          time: { value: 0 },
          oceanTexture: {
            value: new THREE.TextureLoader().load(LavaTexture),
          },
        },
      });
      setMaterial(someMaterial);
      return;
    }

    if (!geometry) {
      var newGeometry: any = new THREE.PlaneBufferGeometry(200, 400, 10, 10);

      setGeometry(newGeometry);
      return;
    }

    if (!scene) {
      return;
    }

    let newPlane = new THREE.Mesh(geometry, material);

    scene?.add(newPlane);
  }, [material, scene, geometry]);

  useEffect(() => {
    if (camera) {
      // camera?.position.set(0, 0, 100);
      setControls(new OrbitControls(camera, renderer?.domElement));
    }
  }, [camera]);

  return { mountScene, camera, scene, mesh, material, renderer };
};
