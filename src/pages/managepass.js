import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineMore } from "react-icons/ai";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineAccountBox } from "react-icons/md";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { clearCart } from "../../reducers/cartSlice";
import { GoMail } from "react-icons/go";

const Account = ({ user }) => {
  const router = useRouter();
  const orderCount = 0;
  const wishCount = 0;
  const proCount = 0;
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };
  const handlePass = async () => {
    console.log(formData);
    try {
      const { data } = await axios.put(`/api/v1/password/update`, formData);

      if (data.success === true) {
        Swal.fire("GG!", "Passoword Changed Successfully!", "info");
        // router.push("/");
      }
    } catch (err) {
      Swal.fire("Shit Bro!", err.response.data.message, "error");
    }
  };
  console.log(user);
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
      <div className="account_cont">
        <input
          type="password"
          placeholder="Old Password"
          name="oldPassword"
          onChange={handleChange}
          value={formData.oldPassword}
        />
        <input
          type="password"
          placeholder="New Password"
          name="newPassword"
          onChange={handleChange}
          value={formData.newPassword}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
        />
        <div className="" onClick={handlePass}>
          <p>Update Password</p>
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
