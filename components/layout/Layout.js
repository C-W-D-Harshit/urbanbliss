import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BotNav from "./BotNav";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <BotNav />
      <Footer />
    </>
  );
};

export default Layout;
