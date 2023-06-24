import React, { useState, useEffect } from "react";
import {
  GALLERY_CARD_CLASSNAME,
  GALLERY_SECTION_CLASSNAME,
} from "../types/constants";
import { setTimeout } from "timers/promises";

export default function getGalleryCardImages() {
  const [cardImages, setCardImages] = useState<null | NodeListOf<Element>>(
    null
  );

  useEffect(() => {
    setTimeout(() => {
      let imagesNodeList = document.querySelectorAll(
        `.${GALLERY_SECTION_CLASSNAME} .${GALLERY_CARD_CLASSNAME} img`
      );

      if (imagesNodeList.length > 0) {
        let nodesArray: Node[] = [];

        imagesNodeList.forEach((item) => nodesArray.push(item));
      }

      setCardImages(imagesNodeList);
    }, 1000);
  }, []);

  return { cardImages };
}
