import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineMore } from "react-icons/ai";
import Loader from "../../../../components/loader/Loader";
import axios from "axios";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Swal from "sweetalert2";

const Order = ({ id }) => {
  const [order, setOrder] = useState(false);
  const [status, setStatus] = useState(true);
  const getOrder = async () => {
    const response = await axios.get(`/api/v1/order/${id}`);
    const data = response.data;
    console.log(data);
    setOrder(data.order);
    setStatus(data.order.orderStatus);
  };
  useEffect(() => {
    getOrder();
  }, []);
  if (!order) {
    return <Loader />;
  }
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
  function getTimeFromCreatedAt(doc) {
    var createdAt = new Date(doc);
    var hours = createdAt.getHours();
    var minutes = createdAt.getMinutes();
    var seconds = createdAt.getSeconds();

    // Formatting hours, minutes, and seconds to have two digits if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
  const orderDate = extractDateFromCreatedAt(order.paidAt);
  const orderTime = getTimeFromCreatedAt(order.paidAt);
  const handleStatus = async (a) => {
    const formData = {
      status: a,
    };
    console.log(formData);
    try {
      const response = await axios.put(`/api/v1/admin/order/${id}`, formData);
      const data = response.data;
      setStatus(a);
      //   Swal.fire("Bro!", data.message, "info");
    } catch (err) {
      console.log(err.message);
      Swal.fire("Bro!", err.message, "info");
    }
  };
  const handleChange = (event) => {
    handleStatus(event.target.value);
    // setStatus(event.target.value);
  };
  let ship = false;
  const shipping = () => {
    if (order.shippingFee === "40") {
      return (ship = "Regular");
    }
    if (order.shippingFee === "100") {
      return (ship = "Express");
    }
    if (order.shippingFee === "0") {
      return (ship = "Free");
    }
  };
  shipping();

  return (
    <div className="ad_order">
      <div className="ad_order_top" style={{ marginBottom: "2rem" }}>
        <div className="ad_order_top1">
          <Link href="/admin/orders" style={{ marginRight: "1rem" }}>
            <AiOutlineArrowLeft />
          </Link>
          <div>
            <p>
              {orderDate} {orderTime}
            </p>
            <p>Order ID: {order._id}</p>
          </div>
        </div>
        <div className="ad_order_top2">
          <div className="ad_order_stat" style={{ marginRight: "1rem" }}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Role"
                  onChange={handleChange}
                >
                  <MenuItem value={"Processing"}>Processing</MenuItem>
                  <MenuItem value={"Shipped"}>Shipped</MenuItem>
                  <MenuItem value={"Delivered"}>Delivered</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="ad_order_cta" style={{ marginRight: "1rem" }}>
            <p>Download Invoice</p>
          </div>
          <div className="ad_order_cta">
            <AiOutlineMore />
          </div>
        </div>
      </div>
      <div className="ad_order_">
        <div className="ad_order1">
          <div>
            <p>Order Details</p>
            {order.length !== 0 ? (
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
                        key={item._id}
                      >
                        <p>{item.product._id}</p>
                        <p style={{ marginLeft: "1rem" }}>
                          {item.cartQuantity}
                        </p>
                        <p>{item.product.size ? item.product.size : "Size"}</p>
                        <p>
                          {item.product.color ? item.product.color : "Color"}
                        </p>
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
          <div>
            <p>Paid By Customer</p>

            <div className="account_cus_tb">
              <div>
                <p>Subtotal</p>
                <p>{order.orderItems.length} Items</p>
                <p>₹{order.itemsPrice}</p>
              </div>
              <div>
                <p>Shipping</p>
                <p>{ship}</p>
                <p>₹{order.shippingFee}</p>
              </div>
              <div>
                <p>Total paid by customer</p>
                <p>₹{order.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="ad_order2">
          <p>Customer Details</p>
          <div className="ad_order2_">
            <p>Name</p>
            <p>
              {order.firstName} {order.lastName}
            </p>
            <p>Email</p>
            <p>{order.email}</p>
            <p>Phone Number</p>
            <p>{order.phoneNumber}</p>
            <p>Shipping Address</p>
            <p>
              {order.streetAddress} {order.city}, {order.state},{" "}
              {order.postalCode}
            </p>
            <p>Payment</p>
            <p>Cash on Delivery</p>
          </div>
        </div>
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

export default Order;
