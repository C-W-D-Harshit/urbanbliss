import { parseCookies } from "nookies";
import React from "react";
import cookie from "js-cookie";
import baseUrl from "../../helpers/baseUrl";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountBox } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import Link from "next/link";

const Account = ({ user, orders }) => {
  const router = useRouter();
  const orderCount = orders.length;
  const wishCount = 0;
  const proCount = 3;
  console.log(orders);
  let dateString = "";
  function handleDate(g) {
    const formattedDate = new Date(g).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const [month, day, year] = formattedDate.split(" ");
    const titleCaseMonth = month.charAt(0).toUpperCase() + month.slice(1);
    dateString = `${day} ${titleCaseMonth} ${year}`;
  }
  return (
    <div className="cont">
      <div className="cont_">
        <div className="sidebar">
          <p>Dashboard</p>
          <div className="gg">
            <Link
              href={`/orders`}
              className={router.pathname === "/orders" ? "jkk jk" : "jk"}
            >
              <BsHandbag />
              <p>Orders</p>
            </Link>
            <p>{orderCount}</p>
          </div>
          <div className="gg">
            <Link
              href={`/wishlist`}
              className={router.pathname === "/wishlist" ? "jkk jk" : "jk"}
            >
              <AiOutlineHeart />
              <p>Wishlist</p>
            </Link>
            <p>{wishCount}</p>
          </div>
          <div className="gg">
            <Link
              href={`/account`}
              className={router.pathname === "/account" ? "jkk jk" : "jk"}
            >
              <MdOutlineAccountBox />
              <p>Profile</p>
            </Link>
            <p>{proCount}</p>
          </div>
          <div className="gg">
            <Link
              href={`${user._id}/orders`}
              className={router.pathname === "/user/orders" ? "jkk jk" : "jk"}
            >
              <MdOutlineAccountBox />
              <p>Update Password</p>
            </Link>
            <p>{0}</p>
          </div>
        </div>
        <div className="order">
          <p>Orders</p>
          {orders &&
            orders.map((order) => {
              handleDate(order.createdAt);
              return (
                <Link
                  href={`/order/${order._id}`}
                  className="orderCard"
                  key={order._id}
                >
                  <div className="orderCard_id">{order._id}</div>
                  <div className="orderCard_st">{order.orderStatus}</div>
                  <p>{dateString}</p>
                  <p>{order.totalPrice}</p>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token, user } = parseCookies(ctx);
  const { req } = ctx;
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return {
      props: {},
    };
  }
  const us = JSON.parse(user);
  let res = null;
  let data = null;
  const options = {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: req.headers.cookie,
    },
  };
  try {
    res = await fetch(`${baseUrl}/api/v1/orders/me`, options);
    data = await res.json();
  } catch (err) {
    return {
      props: {
        error: err.message,
      },
    };
  }
  return {
    props: {
      user: us,
      orders: data.orders,
    },
  };
}

export default Account;
