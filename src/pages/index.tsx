import { GetStaticPaths, GetStaticProps } from "next";
import { getHomeData } from "../utils/wordpress";
import Header from "../components/modules/Header";
import About from "../components/modules/About";
import Galleries from "../components/modules/Galleries";

const index = ({ homeData }: { homeData: HomeDataType }) => {
  return (
    <>
      <Header {...homeData.header} />
      <About {...homeData.About} />
      <Galleries photo_topics={homeData.photo_topics} {...homeData.gallery} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let homeData = await getHomeData();

  return {
    props: { homeData },
  };
};

export default index;
