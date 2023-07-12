import { useEffect, useRef } from "react";

import BaseButton from "../atoms/BaseButton";
import GalleryCard from "../atoms/GalleryCard";
import RichText from "../atoms/RichText";
import isRefReady from "../../three/hooks/isRefReady";
import getMounter from "../../three/example/useMain";

import { GALLERY_SECTION_CLASSNAME } from "../../types/constants";
import { generateUUID } from "three/src/math/MathUtils";

interface GalleriesProps extends GalleriesSectionType {
  photo_topics: PhotoTopicType[];
}

interface GalleryListProps {
  galleries: GalleryType[];
}

const Galleries = ({
  description,
  galleries,
  title,
  photo_topics,
}: GalleriesProps) => {
  const divRef = useRef(null);

  const triggerElement = useRef(null);

  const { mountScene, renderer } = getMounter({
    element: divRef,
  });

  useEffect(() => {
    if (renderer) {
      mountScene();
    }
  }, [renderer]);

  return (
    <div className={`relative ${GALLERY_SECTION_CLASSNAME} h-full w-full`}>
      <div
        className="absolute z-50 h-full w-full top-0 left-0 right-0 bottom-0 m-auto"
        ref={divRef}
      />
      <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl text-3xl text-primary uppercase md:text-left text-center">
        {title}
      </h1>

      <RichText
        className="font-light md:text-left text-center text-lg my-4"
        content={description}
      />

      <div className="flex justify-start space-x-3 flex-nowrap my-5">
        {photo_topics.map((topic) => (
          <BaseButton
            type="primary"
            key={topic.id}
            title={topic.name}
            className="text-sm p-1"
            target="internal"
            url={`/topic/${topic.slug}`}
          />
        ))}
      </div>

      <div
        className="grid gap-4 grid-flow-row md:grid-cols-2 grid-cols-1 relative z-50"
        id="gallery-grid-element"
        ref={triggerElement}
        data-speed="0.5"
      >
        <GalleryCard {...galleries[0]} key={1} />
        <GalleryCard {...galleries[0]} key={2} />
        <GalleryCard {...galleries[0]} key={3} />
        <GalleryCard {...galleries[0]} key={4} />
        <GalleryCard {...galleries[0]} key={5} />
        <GalleryCard {...galleries[0]} key={6} />
      </div>
    </div>
  );
};

const GalleryList = ({ galleries }: GalleryListProps) => {
  const generateKey = ({
    id,
    index,
  }: {
    id: number | string;
    index: number;
  }): string => `${id}-${index}`;

  return (
    <>
      {galleries.map((gallery, index) => (
        <div>
          <GalleryCard {...gallery} key={1} />
          <GalleryCard {...gallery} key={2} />
          <GalleryCard {...gallery} key={3} />
          <GalleryCard {...gallery} key={4} />
          <GalleryCard {...gallery} key={5} />
          <GalleryCard {...gallery} key={6} />
        </div>
      ))}
    </>
  );
};

export default Galleries;
