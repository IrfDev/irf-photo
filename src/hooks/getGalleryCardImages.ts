import React, { useState, useEffect } from "react";
import {
  GALLERY_CARD_CLASSNAME,
  GALLERY_SECTION_CLASSNAME,
} from "../types/constants";

export default function getGalleryCardImages() {
  const [cardImages, setCardImages] = useState<null | HTMLImageElement[]>(null);

  useEffect(() => {
    setTimeout(() => {
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

      setCardImages(nodesArray);
    }, 1000);
  }, []);

  return { cardImages };
}
