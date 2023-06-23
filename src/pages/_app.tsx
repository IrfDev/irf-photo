import "../assets/global.css";
import "../assets/global.scss";
import Layout from "../layouts/default";

function _app({ Component, pageProps }: any) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default _app;
