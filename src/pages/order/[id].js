import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import Loader from "../../../components/loader/Loader";

const Account = ({ user, id }) => {
  const router = useRouter();
  const [order, setOrder] = useState(false);
  function extractDateFromCreatedAt(doc) {
    var createdAtDate = new Date(doc);
    var day = createdAtDate.getDate();
    var month = createdAtDate.getMonth() + 1; // Adding 1 to the month since it is zero-based
    var year = createdAtDate.getFullYear().toString().slice(-2); // Extracting the last two digits of the year

    // Formatting day, month, and year to have two digits if needed
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return day + "/" + month + "/" + year;
  }
  const oD = extractDateFromCreatedAt(order.paidAt);
  const getData = async () => {
    const response = await axios.get(`/api/v1/order/${id}`);
    const data = response.data;
    setOrder(data.order);
  };
  useEffect(() => {
    getData();
  }, []);

  if (!order) {
    return <Loader />;
  }
  console.log(order);
  return (
    <div className="account home">
      <div className="account__protop" style={{ marginBottom: "2rem" }}>
        <div>
          <Image src={`/d11.jpg`} width={1800} height={100} alt="img" />
          <div>
            <p>{user.name.charAt(0)}</p>
          </div>
        </div>
        <div>
          <div>
            <p>{user.name}</p>
            <div>
              <GoMail />
              <p>{user.email}</p>
            </div>
          </div>
          <div>
            <AiOutlineMore />
          </div>
        </div>
      </div>
      <div className="account_act" style={{ marginBottom: "2rem" }}>
        <Link
          href="/account"
          className={router.pathname === "/account" ? "acco" : null}
        >
          <p>Account settings</p>
        </Link>
        <Link
          href="/managepass"
          className={router.pathname === "/managepass" ? "acco" : null}
        >
          <p>Manage password</p>
        </Link>
        <Link
          href="/order-history"
          className={
            router.pathname === "/order-history" || router.pathname === "/order"
              ? "acco"
              : null
          }
        >
          <p>Order History</p>
        </Link>
      </div>
      <div className="account__cont">
        <p>Order ID: {order._id}</p>
        <p style={{ marginBottom: "1rem" }}>Status: {order.orderStatus}</p>
        <div className="account__prod">
          <p>Products</p>
          <div className="og">
            <div className="ogf">
              <p>Product ID</p>
              <p>Quantity</p>
              <p>Size</p>
              <p>Color</p>
            </div>
            {order &&
              order.orderItems.map((item) => {
                return (
                  <Link
                    href={`/product/${item.product._id}`}
                    className="ogf"
                    key={order._id}
                  >
                    <p>{item.product._id}</p>
                    <p>{item.cartQuantity}</p>
                    <p>{item.product.size}</p>
                    <p>{item.product.color}</p>
                  </Link>
                );
              })}
          </div>
        </div>
        <div className="account__prod">
          <p>Shipping Address</p>
          <div className="account__cont">
            <p style={{ fontSize: "1.2rem" }}>
              {order.streetAddress} {order.city} {order.state}{" "}
              {order.postalCode}
            </p>
          </div>
        </div>
        <div className="account__prod">
          <p>Ordered At</p>
          <div className="account__cont">
            <p style={{ fontSize: "1.2rem" }}>{oD}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token, user } = parseCookies(ctx);
  const {
    params: { id },
    req,
    res,
  } = ctx;
  const user_ = JSON.parse(user);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return {
      props: {},
    };
  }

  return {
    props: {
      user: user_,
      id,
    },
  };
}

export default Account;
