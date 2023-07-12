import React, { useState, useEffect, MutableRefObject } from "react";

import type { ImageStore } from "../example/useMain";

import { gsap } from "gsap";
import * as THREE from "three";
import useGetGalleryCardImage from "../../hooks/getGalleryCardImages";
import createBaseWaveMaterial from "../utils/createBaseWaveMaterial";
import { getElementSize } from "../utils/canvasElementFunctions";

const useMountImages = ({
  scene,
  element,
}: {
  scene: THREE.Scene | null;
  element: MutableRefObject<HTMLCanvasElement>;
}) => {
  const { cardImages } = useGetGalleryCardImage();
  const [materials, setMaterials] = useState<THREE.ShaderMaterial[]>([]);
  const [imageStore, setImageStore] = useState<null | ImageStore[]>(null);

  let setPosition = () => {
    if (Array.isArray(imageStore) && imageStore.length > 0) {
      let { height, width, top, left } = getElementSize(element);
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
        let baseMaterial = createBaseWaveMaterial();

        let newImageStore: Array<ImageStore> = cardImages.map(
          (img: HTMLImageElement, index: number) => {
            console.log("index", index);
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

            imageMaterial.uniforms.uImage.value = texture;
            let newMesh = new THREE.Mesh(newGeometry, imageMaterial);

            scene?.add(newMesh);

            return {
              img: img,
              mesh: newMesh,
              imageMaterial,
              top: bounds.top,
              left: bounds.left,
              width: bounds.width,
              height: bounds.height,
            };
          }
        );

        setImageStore(newImageStore);
        setPosition();

        setMaterials(newImageStore.map(({ imageMaterial }) => imageMaterial));
      } catch (error) {
        console.error(error);
      }
    };

    mountImages();
  }, [cardImages, scene]);

  return { materials, imageStore, setPosition };
};

export default useMountImages;
