import { App } from "next";

declare global {
  interface IPost {
    id: number;
    title: string;
    body: string;
  }

  interface WpImage {
    ID: number;
    id: number;
    title: string;
    filename: string;
    filesize: number;
    url: string;
    link: string;
    alt: string;
    author: string;
    description: string;
    caption: string;
    name: string;
    status: string;
    uploaded_to: number;
    date: string;
    modified: string;
    menu_order: number;
    mime_type: string;
    type: string;
    subtype: string;
    icon: string;
    width: number;
    height: number;
    sizes: WpImageSizes;
  }

  interface SeoType {
    title: string;
    description: string;
    main_image: WpImage;
    twitter_image: WpImage;
  }

  interface WpImageSizes {
    thumbnail: string;
    "thumbnail-width": number;
    "thumbnail-height": number;
    medium: string;
    "medium-width": number;
    "medium-height": number;
    medium_large: string;
    "medium_large-width": number;
    "medium_large-height": number;
    large: string;
    "large-width": number;
    "large-height": number;
    "1536x1536": string;
    "1536x1536-width": number;
    "1536x1536-height": number;
    "2048x2048": string;
    "2048x2048-width": number;
    "2048x2048-height": number;
  }

  interface WpLink {
    title: string;
    url: string;
    target: string;
  }

  interface HomeDataType {
    header: HeroHeaderFieldType;
    About: AboutFieldType;
  }

  interface HeroHeaderFieldType {
    title: string;
    hero: WpImage;
  }

  interface AboutFieldType {
    title: string;
    about: string;
    cta: WpLink;
  }

  interface GallerySectionType {
    title: string;
    main_title: string;
    main_image: WpImage;
    photos;
  }

  interface GalleryImagePhoyo {
    id: number;
    title: string;
    caption: string;
    full_image_url: string;
    thumbnail_image_url: string;
    large_srcset: string;
    medium_srcset: string;
    url: string;
    target: string;
  }

  declare module "*.glsl" {
    const value: string;
    export default value;
  }

  declare module "*.vs" {
    const value: string;
    export default value;
  }

  declare module "*.fs" {
    const value: string;
    export default value;
  }
}
