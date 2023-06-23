import Image from "next/image";
import React from "react";

const BaseImage = (props: any) => {
  if (typeof props.width === "number") {
    let wpProps: WpImage = props;
    return (
      <Image
        className={props.className || ""}
        alt={wpProps.alt}
        height={wpProps.height}
        placeholder="empty"
        src={wpProps.url}
        width={wpProps.width}
      />
    );
  } else {
    let photoProp: GalleryImagePhoyo = props;
    return (
      <Image
        fill={true}
        className={props.className || ""}
        placeholder="empty"
        src={photoProp.full_image_url}
        alt={photoProp.caption}
        title={photoProp.title}
      />
    );
  }
};

export default BaseImage;
