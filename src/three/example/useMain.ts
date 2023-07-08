import React, { MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import fragment from "../shader/fragmet.glsl";
import vertex from "../shader/vertex.glsl";
import { GALLERY_SECTION_CLASSNAME } from "../../types/constants";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { gsap } from "gsap";

import useGetGalleryCardImage from "../../hooks/getGalleryCardImages";

import getScrollTrigger from "../../animations/ScrollTrigger";

type ImageStore = {
  img: HTMLImageElement;
  mesh: THREE.Mesh;
  top: number;
  left: number;
  width: number;
  height: number;
};

import ocean from "../../assets/lava.jpg";

export default ({ element }: any) => {
  const [materials, setMaterials] = useState<THREE.ShaderMaterial[]>([]);

  const [controls, setControls] = useState<null | OrbitControls>(null);

  const [raycaster, setRayCaster] = useState<THREE.Raycaster>(
    new THREE.Raycaster()
  );

  const [time, setTime] = useState<number>(0);

  const [imageStore, setImageStore] = useState<null | ImageStore[]>(null);

  const [mouse, setMouse] = useState<THREE.Vector2>(new THREE.Vector2());
  const { cardImages } = useGetGalleryCardImage();

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

  let setPosition = () => {
    if (Array.isArray(imageStore) && imageStore.length > 0) {
      let { height, width, top, left } = getElementSize();
      imageStore.forEach((o) => {
        let actualTop = Math.abs(top - o.top);
        let actualLeft = Math.abs(left - o.left);

        let yPosition = -actualTop + height / 2 - o.height / 2;

        let xPosition = actualLeft - width / 2 + o.width / 2;

        o.mesh.position.setX(xPosition);
        o.mesh.position.setY(yPosition);
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(imageStore) && imageStore.length > 0) {
      setPosition();
    }
  }, [imageStore]);

  useEffect(() => {
    if (!cardImages || !scene) {
      return;
    }

    const mountImages = async () => {
      try {
        let baseMaterial = new THREE.ShaderMaterial({
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

        let newImageStore: Array<ImageStore> = cardImages.map(
          (img: HTMLImageElement, index: number) => {
            let bounds = img.getBoundingClientRect();

            let newGeometry = new THREE.PlaneGeometry(
              bounds.width,
              bounds.height,
              10,
              10
            );

            let imageMaterial = baseMaterial.clone();

            let texture = new THREE.TextureLoader().load(img.src);

            texture.needsUpdate = true;

            img.onmouseenter = () => {
              gsap.to(imageMaterial.uniforms.hoverState, {
                duration: 1,
                value: 1,
              });
            };

            img.onmouseout = () => {
              gsap.to(imageMaterial.uniforms.hoverState, {
                duration: 1,
                value: 0,
              });
            };

            setMaterials([...materials, imageMaterial]);

            imageMaterial.uniforms.uImage.value = texture;
            let newMesh = new THREE.Mesh(newGeometry, imageMaterial);

            scene?.add(newMesh);

            return {
              img: img,
              mesh: newMesh,
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
            };
          }
        );

        setImageStore(newImageStore);
        setPosition();
        setMouseMovement();
      } catch (error) {
        console.error(error);
      }
    };

    mountImages();
  }, [cardImages, scene]);

  const getElementSize = () => ({
    height: element?.current?.getBoundingClientRect().height,
    width: element?.current?.getBoundingClientRect().width,
    top: element?.current?.getBoundingClientRect().top,
    left: element?.current?.getBoundingClientRect().left,
  });

  const setMouseMovement = () => {
    element?.current?.parentElement.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        let { height, width } = getElementSize();

        let mouseX = (event.clientX / width) * 2 - 1;

        let mouseY = -(event.clientY / height) * 2 + 1;

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
  };

  useEffect(() => {
    if (camera) {
      // setControls(new OrbitControls(camera, renderer?.domElement));
    }
  }, [camera]);

  return { mountScene, renderer };
};
