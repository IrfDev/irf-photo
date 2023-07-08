import React, { useState, useEffect } from "react";
import {
  GALLERY_CARD_CLASSNAME,
  GALLERY_SECTION_CLASSNAME,
} from "../types/constants";

export default function useGetGalleryCardImage() {
  const [cardImages, setCardImages] = useState<null | HTMLImageElement[]>(null);

  useEffect(() => {
    const setImages = async () => {
      let imagesNodeList = document.querySelectorAll(
        `.${GALLERY_SECTION_CLASSNAME} .${GALLERY_CARD_CLASSNAME} img`
      );

      let nodesArray: HTMLImageElement[] = [];

      if (imagesNodeList.length > 0) {
        imagesNodeList.forEach(
          (item: Element) =>
            item instanceof HTMLImageElement && nodesArray.push(item)
        );
      }

      await Promise.all(
        nodesArray.map((newImage: HTMLImageElement) => {
          return new Promise<any>((resolve, reject) => {
            newImage.addEventListener("error", (error) => {
              console.log("onload2");
              reject(error);
            });
            if (newImage.complete) {
              resolve(true);
            } else {
              newImage.onload = () => {
                console.log("onload");
                resolve(true);
              };

              newImage.addEventListener("load", () => {
                console.log("onload2");
                resolve(true);
              });
            }
          });
        })
      );

      console.log("imagesReady", nodesArray);
      setCardImages(nodesArray);
    };

    setImages();
  }, []);

  return { cardImages };
}
