import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-between"
    style={{
        backgroundImage: "url(background-Image.jpg)",
      height: "100vh",
      backgroundSize: "cover",
      width: "100vw",
    }}>
      <Header />
      <main className="flex-fill" style={{width: "100%"}}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
