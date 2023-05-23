import { Badge } from "@mui/material";
import axios from "axios";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight, AiOutlineBell } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";
import Loader from "../../../components/loader/Loader";
import Swal from "sweetalert2";

const Index = ({ user }) => {
  const [orders, setOrders] = useState(false);
  const [sales, setSales] = useState(false);
  const getOrders = async () => {
    const response = await axios.get(`/api/v1/admin/orders`);
    const data = response.data;
    console.log(data);
    setOrders(data.orders);
    setSales(data.totalAmount);
  };
  useEffect(() => {
    getOrders();
  }, []);

  if (!orders) {
    return <Loader />;
  }
  const de = async () => {
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
  const handleLogout = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Logout?",
        text: "Click Logout!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Logout!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          de();
          swalWithBootstrapButtons.fire(
            "Logout!",
            "Your Account has been logged out!",
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
    <div className="adminDash">
      <div className="adminDash_top">
        <p>
          Welcome, <span>{user.name}</span>
        </p>
        <div className="adminDash_user">
          <div className="adminDash_user_search">
            <input type="search" placeholder="Search for products..." />
            <BiSearch />
          </div>
          <div className="adminDash_user_">
            <Badge color="primary" variant="dot">
              <AiOutlineBell />
            </Badge>
          </div>
          <div className="adminDash_user_" onClick={handleLogout}>
            <p>{user.name.charAt(0)}</p>
          </div>
        </div>
      </div>
      <div className="adminDash_cont">
        <div className="adminDash_cont_l">
          <div className="adminDash_cont_l_1">
            <div>
              <MdOutlineLibraryBooks />
              <div className="adminDash_cont_l_1_">
                <div className="adminDash_cont_l_1__">
                  <p>{orders.length}</p>
                  <div>
                    <p style={{ fontSize: "1.2rem" }}>+20</p>
                  </div>
                </div>
                <p>Orders</p>
              </div>
            </div>
            <div>
              <BsGraphUpArrow />
              <div className="adminDash_cont_l_1_">
                <div className="adminDash_cont_l_1__">
                  <p>₹{sales}</p>
                  <div>
                    <p style={{ fontSize: "1.2rem" }}>+29</p>
                  </div>
                </div>
                <p>Sales</p>
              </div>
            </div>
          </div>
        </div>
        <div className="adminDash_cont_r">
          <div className="adminDash_cont_r_">
            <p>Top Selling Products</p>
            <div>
              <p>See all</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user } = parseCookies(ctx);
  const user_ = JSON.parse(user);
  return {
    props: {
      user: user_,
    },
  };
}

export default Index;
