import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

const User = ({ id }) => {
  const [user, setUser] = useState(false);
  const [orders, setOrders] = useState(false);
  const [role, setRole] = React.useState(false);
  const getUser = async () => {
    const response = await axios.get(`/api/v1/admin/user/${id}`);
    const data = response.data;
    // console.log(data);
    setUser(data.user);
    setRole(data.user.role);
  };
  const getOrders = async () => {
    const response = await axios.get(`/api/v1/admin/orders`);
    const data = response.data;
    //   console.log(data);
    var ordersForCurrentUser = data.orders.filter(function (order) {
      return order.user === id;
    });
    setOrders(ordersForCurrentUser);
  };
  useEffect(() => {
    getUser();
    getOrders();
  }, []);
  var totalAmount =
    orders &&
    orders.reduce(function (sum, order) {
      return sum + order.totalPrice;
    }, 0);
  var completedOrders =
    orders &&
    orders.filter(function (order) {
      return order.orderStatus === "completed";
    });
  var cancelledOrders =
    orders &&
    orders.filter(function (order) {
      return order.orderStatus === "cancelled";
    });

  if (!user && !orders) {
    return <Loader />;
  }
  const handleRole = async (a) => {
    const formData = {
      name: user.name,
      email: user.email,
      role: a,
    };
    // console.log(formData);
    try {
      const response = await axios.put(`/api/v1/admin/user/${id}`, formData);
      const data = response.data;
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleChange = (event) => {
    setRole(event.target.value);
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
        text: "You will change user role!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, change it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          handleRole(event.target.value);
          swalWithBootstrapButtons.fire(
            "Changed!",
            "Role has been updated!",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Role remains same!",
            "info"
          );
        }
      });
  };
  //   console.log(orders);
  return (
    <div className="ad_user">
      <div className="ad_user_top">
        <Link href="/admin/users" style={{ marginRight: "1rem" }}>
          <AiOutlineArrowLeft />
        </Link>
        <div>
          <p>Back to users</p>
          <p>{user.name}</p>
        </div>
      </div>
      <div className="ad_user_s">
        <div>
          <p>Total Cost</p>
          <p>₹{totalAmount}</p>
        </div>
        <div>
          <p>Total Orders</p>
          <p>{orders.length}</p>
        </div>
        <div>
          <p>Completed Orders</p>
          <p>{completedOrders.length}</p>
        </div>
        <div>
          <p>Cancelled Orders</p>
          <p>{cancelledOrders.length}</p>
        </div>
      </div>
      <div className="ad_user_role">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const {
    params: { id },
  } = ctx;

  return {
    props: {
      id,
    },
  };
}

export default User;
