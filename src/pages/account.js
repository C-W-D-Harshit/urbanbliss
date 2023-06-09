import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React from "react";
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
  const de = async () => {
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
  const handleDelete = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          de();
          swalWithBootstrapButtons.fire(
            "Deleted!",
            "Your Account has been deleted.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Your Account is safe :)",
            "error"
          );
        }
      });
  };

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
        {user.role === "admin" && (
          <Link href="/admin">
            <p>Admin</p>
          </Link>
        )}
        <div className="ghy" onClick={handleLogout}>
          <p>Logout</p>
        </div>
        <div className="ghy" onClick={handleDelete}>
          <p>Delete Account</p>
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
