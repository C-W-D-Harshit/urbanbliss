import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountBox } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { clearCart } from "../../reducers/cartSlice";
import { GoMail } from "react-icons/go";
import { Divider } from "@mui/material";
import Loader from "../../components/loader/Loader";

const Account = ({ user }) => {
  const router = useRouter();
  const orderCount = 0;
  const wishCount = 0;
  const proCount = 0;
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(false);
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`/api/v1/logout`);

      if (data.success === true) {
        Cookies.remove("user");
        dispatch(clearCart());
        Swal.fire("Good job!", "Logged Out Successfully!", "success");
        router.push("/");
      }
    } catch (err) {
      Swal.fire("Shit Bro!", err.response.data.message, "error");
    }
  };
  const handleGet = async () => {
    const response = await axios.get(`/api/v1/orders/me`);
    const ord = response.data;
    setOrders(ord.orders);
  };
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

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/me`);

      if (data.success === true) {
        Cookies.remove("user");
        dispatch(clearCart());
        Swal.fire("!", "Account Deleted Successfully!", "info");
        router.push("/");
      }
    } catch (err) {
      Swal.fire("Shit Bro!", err.response.data.message, "error");
    }
  };
  useEffect(() => {
    handleGet();
  }, []);
  console.log(orders);
  if (!orders) {
    return <Loader />;
  }

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
          className={router.pathname === "/order-history" ? "acco" : null}
        >
          <p>Order History</p>
        </Link>
      </div>
      {orders.length !== 0 ? (
        <div className="og">
          <div className="ogf">
            <p>Order ID</p>
            <p>Date</p>
            <p>Amount</p>
            <p>Status</p>
          </div>
          {orders &&
            orders.map((order) => {
              var extractedDate = extractDateFromCreatedAt(order.paidAt);
              return (
                <Link
                  href={`/order/${order._id}`}
                  className="ogf"
                  key={order._id}
                >
                  <p>{order._id}</p>
                  <p>{extractedDate}</p>
                  <p>{order.totalPrice}</p>
                  <p>{order.orderStatus}</p>
                </Link>
              );
            })}
        </div>
      ) : (
        <div className="account_cont">
          <h1>No Orders Yet</h1>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { token, user } = parseCookies(ctx);
  if (!token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/login" });
    res.end();
    return {
      props: {},
    };
  }
  const user_ = JSON.parse(user);
  return {
    props: {
      user: user_,
    },
  };
}

export default Account;
