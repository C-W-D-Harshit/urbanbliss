import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import Head from "next/head";

const AdminLayout = ({ children }) => {
  // useEffect(() => {
  //   gh();
  // }, []);

  return (
    <>
      <Head>
        <title>Urban Bliss - Admin</title>
        <meta name="description" content="Urban Bliss an Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="adminLayout">
        <Sidebar />
        <div className="adminCont">
          <div className="adminCont_">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
