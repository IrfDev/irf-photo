import BaseButton from "../atoms/BaseButton";
import GalleryCard from "../atoms/GalleryCard";
import RichText from "../atoms/RichText";
import MainScene from "../organisms/MainScene";

import { GALLERY_SECTION_CLASSNAME } from "../../types/constants";

interface GalleriesProps extends GalleriesSectionType {
  photo_topics: PhotoTopicType[];
}

const Galleries = ({
  description,
  galleries,
  title,
  photo_topics,
}: GalleriesProps) => {
  return (
    <div className={`relative ${GALLERY_SECTION_CLASSNAME}`}>
      <h1 className="xl:text-8xl lg:text-7xl md:text-5xl sm:text-4xl text-3xl text-primary uppercase md:text-left text-center">
        {title}
      </h1>

      <RichText
        className="font-light md:text-left text-center text-lg my-4"
        content={description}
      />
      <MainScene />

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

      <div className="grid gap-4 grid-flow-row md:grid-cols-2 grid-cols-1">
        {galleries.map((gallery) => (
          <>
            <GalleryCard {...gallery} key={gallery.id + 1} />
            <GalleryCard {...gallery} key={gallery.id + 2} />
            <GalleryCard {...gallery} key={gallery.id + 3} />
            <GalleryCard {...gallery} key={gallery.id + 4} />
            <GalleryCard {...gallery} key={gallery.id + 5} />
            <GalleryCard {...gallery} key={gallery.id + 6} />
          </>
        ))}
      </div>
    </div>
  );
};

export default Galleries;
