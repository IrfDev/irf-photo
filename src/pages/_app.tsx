import "../assets/global.css";
import "../assets/global.scss";

function _app({ Component, pageProps }: any) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default _app;
