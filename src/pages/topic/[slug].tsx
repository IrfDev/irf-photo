import { GetStaticPaths, GetStaticProps } from "next";
import { getTopicPageData, getTopics } from "../../utils/wordpress";

const SlugTopic = (props: TopicPageData) => {
  return <pre className="bg-primary h-screen overflow-scroll text-white"></pre>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  let topics = await getTopics();
  return {
    paths: topics.map((topic: PhotoTopicType) => ({
      params: {
        slug: topic.slug,
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

  let topicData = await getTopicPageData(params.slug);

  return {
    props: {
      topicData,
    },
  };
};

export default SlugTopic;
