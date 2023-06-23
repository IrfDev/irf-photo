import { GetStaticPaths, GetStaticProps } from "next";
import { getHomeData } from "../utils/wordpress";

const index = ({ homeData }: { homeData: HomeDataType }) => {
  return <div>Enter</div>;
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  let homeData = await getHomeData();

  return {
    props: { homeData },
  };
};

export default index;
