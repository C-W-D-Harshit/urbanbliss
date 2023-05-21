import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineDropbox, AiOutlineStar } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsGraphUpArrow, BsShop } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="admin_sidebar">
      <Link href="/" className="admin_sidebar__tit">
        <p>Urban Bliss</p>
      </Link>
      <div className="admin_sidebar__menu">
        <Link
          href={`/admin`}
          className={router.pathname === "/admin" ? "adminActive" : ""}
        >
          <BsShop />
          <p>Dashboard</p>
        </Link>
        <Link
          href={`/admin/orders`}
          className={
            router.pathname === "/admin/orders" ||
            router.pathname.startsWith("/admin/order")
              ? "adminActive"
              : ""
          }
        >
          <MdOutlineLibraryBooks />
          <p>Orders</p>
        </Link>
        <Link
          href={`/admin/products`}
          className={
            router.pathname === "/admin/products" ||
            router.pathname.startsWith("/admin/product")
              ? "adminActive"
              : ""
          }
        >
          <AiOutlineDropbox />
          <p>Products</p>
        </Link>
        <Link
          href={`/admin/users`}
          className={
            router.pathname === "/admin/users" ||
            router.pathname.startsWith("/admin/user")
              ? "adminActive"
              : ""
          }
        >
          <BiUser />
          <p>Users</p>
        </Link>
        <Link
          href={`/admin/ratings`}
          className={
            router.pathname === "/admin/ratings" ||
            router.pathname.startsWith("/admin/rating")
              ? "adminActive"
              : ""
          }
        >
          <AiOutlineStar />
          <p>Ratings</p>
        </Link>
        <Link
          href={`/admin/reports`}
          className={
            router.pathname === "/admin/reports" ||
            router.pathname.startsWith("/admin/report")
              ? "adminActive"
              : ""
          }
        >
          <BsGraphUpArrow />
          <p>Reports</p>
        </Link>
      </div>
      <p>@2023 Urban Bliss</p>
    </div>
  );
};

export default Sidebar;
