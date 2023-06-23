import { App } from "next";

declare global {
  interface IPost {
    id: number;
    title: string;
    body: string;
  }

  interface TopicPageData extends PhotoTopicType {
    medias: WpImage[];
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
    target?: string;
  }

  interface HomeDataType {
    header: HeroHeaderFieldType;
    About: AboutFieldType;
    gallery: GalleriesSectionType;
    photo_topics: PhotoTopicType[];
  }

  interface GalleriesSectionType {
    galleries: GalleryType[];
    title: string;
    description: string;
  }

  interface HeroHeaderFieldType {
    title: string;
    hero: { hero_image: WpImage; title: string };
  }

  interface AboutFieldType {
    title: string;
    about: string;
    cta: WpLink;
  }

  interface WpEntry {
    slug: string;
    id?: string;
    ID?: string;
    type: string;
    link: string;
  }

  interface GalleryType extends WpEntry {
    title: string;
    main_title: string;
    main_image: WpImage;
    photos: GalleryImagePhoyo;
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

  interface PhotoTopicType {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: sting;
    parent: number;
    meta: any;
    acf: any;
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
