import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountBox } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { clearCart } from "../../reducers/cartSlice";

const Account = ({ user }) => {
  const router = useRouter();
  const orderCount = 0;
  const wishCount = 0;
  const proCount = 0;
  const dispatch = useDispatch();
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
        <div className="account">
          <p>Profile</p>
          <div>
            <p>{user.name.charAt(0)}</p>
          </div>
          <div>
            <p>
              Name: <b>{user.name}</b>
            </p>
          </div>
          <div>
            <p>
              Email: <b>{user.email}</b>
            </p>
          </div>
          <div className="acc_ct">
            {user.role === "admin" && (
              <div
                className="acc_cta"
                onClick={() => router.push("/admin")}
                style={{ marginRight: "1rem" }}
              >
                <p>Admin</p>
              </div>
            )}
            <div className="acc_cta" onClick={handleLogout}>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
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
