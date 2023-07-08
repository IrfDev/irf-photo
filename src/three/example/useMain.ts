import React, { MutableRefObject, useEffect, useState } from "react";
import * as THREE from "three";
import { useStartScene } from "../hooks/StartScene";
import fragment from "../shader/fragmet.glsl";
import vertex from "../shader/vertex.glsl";
import { GALLERY_SECTION_CLASSNAME } from "../../types/constants";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { gsap } from "gsap";

import getGalleryCardImages, {
  waitForImages,
} from "../../hooks/getGalleryCardImages";

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

export default ({
  element,
  triggerElement,
}: {
  element: MutableRefObject<null | HTMLElement>;
}) => {
  const [materials, setMaterials] = useState<THREE.ShaderMaterial[]>([]);

  const [controls, setControls] = useState<null | OrbitControls>(null);

  const [raycaster, setRayCaster] = useState<THREE.Raycaster>(
    new THREE.Raycaster()
  );

  const [time, setTime] = useState<number>(0);

  const [mouse, setMouse] = useState<THREE.Vector2>(new THREE.Vector2());

  const [imageStore, setImageStore] = useState<null | ImageStore[]>(null);

  const { cardImages } = getGalleryCardImages();

  const { scrollTrigger } = getScrollTrigger("gallery-grid-element");

  const animationFunction = () => {
    setTime(time + 0.5);
    if (!materials || !renderer || !camera || !scene) {
      return;
    }

    setPosition();

    materials.forEach((m) => {
      m.uniforms.time.value = time;
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

  const mountImages = async () => {
    if (!cardImages || !scene) {
      return;
    }

    let baseMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1 },
        uImage: { value: 0 },
        hover: { value: new THREE.Vector2(0.5, 0.5) },
        hoverState: { value: 0 },
        oceanTexture: { value: new THREE.TextureLoader().load(ocean) },
      },
      side: THREE.DoubleSide,
      fragmentShader: fragment,
      vertexShader: vertex,
    });

    await waitForImages(cardImages);

    let newImageStore: Array<ImageStore> = await Promise.all(
      cardImages.map(async (img: HTMLImageElement, index: number) => {
        let bounds = img.getBoundingClientRect();

        let newGeometry = new THREE.PlaneGeometry(
          bounds.width,
          bounds.height,
          10,
          10
        );

        let imageMaterial = baseMaterial.clone();
        let texture = new THREE.Texture(img);

        texture.needsUpdate = true;

        imageMaterial.uniforms.uImage.value = texture;

        setMaterials([...materials, imageMaterial]);

        let newMesh = new THREE.Mesh(newGeometry, imageMaterial);

        scene?.add(newMesh);

        img.addEventListener("mouseenter", () => {
          gsap.to(imageMaterial.uniforms.hoverState, {
            duration: 1,
            value: 1,
          });
        });

        img.onmouseout = () => {
          console.log("onmouseout");
          gsap.to(imageMaterial.uniforms.hoverState, {
            duration: 1,
            value: 0,
          });
        };

        return {
          img: img,
          mesh: newMesh,
          top: bounds.top,
          left: bounds.left,
          width: bounds.width,
          height: bounds.height,
        };
      })
    );

    setImageStore(newImageStore);
    setMouseMovement();
  };

  useEffect(() => {
    mountImages();
  }, [cardImages, scene, element]);

  const getElementSize = () => ({
    height: element.current.clientHeight,
    width: element.current.clientWidth,
    top: element.current.getBoundingClientRect().top,
    left: element.current.getBoundingClientRect().left,
  });

  const setMouseMovement = () => {
    element?.current?.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        if (!camera || !scene || !mouse) {
          return;
        }

        let { height, width } = getElementSize();

        let mouseX = (event.clientX / width) * 2 - 1;

        let mouseY = -(event.clientY / height) * 2 + 1;

        mouse.x = mouseX;

        mouse.y = mouseY;

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
