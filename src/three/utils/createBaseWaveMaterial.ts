import * as THREE from "three";
import fragment from "../shader/fragmet.glsl";
import vertex from "../shader/vertex.glsl";

import ocean from "../../assets/lava.jpg";

export default () => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      uImage: { value: 0 },
      hover: { value: new THREE.Vector2(0.5, 0.5) },
      hoverState: { value: 0 },
      oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
    },
    side: THREE.DoubleSide,
    fragmentShader: fragment,
    vertexShader: vertex,
  });
};
