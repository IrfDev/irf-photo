import { ReactElement } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

type DefaultLayoutProps = {
  children: ReactElement;
};

export default function ({ children }: DefaultLayoutProps) {
  return (
    <main
      className="mx-auto 2xl:px-0 px-5"
      style={{
        maxWidth: "1510px",
      }}
    >
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
