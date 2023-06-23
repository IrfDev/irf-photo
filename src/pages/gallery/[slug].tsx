import { GetStaticPaths, GetStaticProps } from "next";
import { getGalleries, getGalleryPageData } from "../../utils/wordpress";

const SlugTopic = (props: GalleryType) => {
  return <pre className="bg-primary h-screen overflow-scroll text-white"></pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  let galleries = await getGalleries();
  return {
    paths: galleries.map((gallery: GalleryType) => ({
      params: {
        slug: gallery.slug,
      },
    })),

    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  let params = ctx.params;
  if (!params || typeof params.slug !== "string") {
    return { props: {} };
  }

  let galleryData = await getGalleryPageData(params.slug);

  return {
    props: {
      galleryData,
    },
  };
};

export default SlugTopic;
