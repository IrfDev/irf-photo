import Link from "next/link";
import BaseImage from "./BaseImage";
import { GALLERY_CARD_CLASSNAME } from "../../types/constants";
import { HtmlHTMLAttributes } from "react";

const GalleryCard = ({ main_image, main_title, title, slug }: GalleryType) => {
  return (
    <Link
      href={`/gallery/${slug}`}
      className={`${GALLERY_CARD_CLASSNAME} relative block gallery-card`}
      scroll={true}
      style={{
        height: "90vh",
      }}
    >
      <BaseImage
        className="object-cover w-full h-5/6  opacity-0"
        {...main_image}
      />
      <div className="mt-4">
        <small className="uppercase block font-light tracking-wider ">
          {title} / PHOTOGRAPHY
        </small>
        <div className="w-full flex justify-between items-end">
          <span className="font-bold text-4xl text-left uppercase">
            {main_title}
          </span>

          <svg
            className="h-6 mb-3"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.0065 6.47487L2.94496 21.5364L0.470093 19.0616L15.5316 4H2.25653V0.5H21.5065V19.75H18.0065V6.47487Z"
              fill="#1C1B1B"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
