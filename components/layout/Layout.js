import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import BotNav from "./BotNav";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { atc } from "../../reducers/cartSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const cartItems = localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [];
    dispatch(atc(cartItems));
  });
  return (
    <>
      <Head>
        <title>Urban Bliss</title>
        <meta name="description" content="Urban Bliss an Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <Header />
      {children}
      <BotNav />
      <Footer />
    </>
  );
};

export default Layout;
