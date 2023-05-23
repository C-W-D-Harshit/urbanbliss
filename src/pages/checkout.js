import { Divider, Radio } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearCart } from "../../reducers/cartSlice";

const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user_ = Cookies.get("user");
  let _id = null;
  if (user_) {
    const user = JSON.parse(user_);
    _id = user._id;
  }
  const [orderItems, setOrderItems] = useState(cart.cartItems);
  const [s, setS] = useState(null);
  const shipFee = (a) => {
    setS(a);
  };
  const totPrice = cart.cartTotalAmount + s;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    city: "",
    postalCode: 0,
    shippingFee: 0,
    streetAddress: "",
    state: "",
    user: _id,
    taxPrice: 0,
    itemsPrice: cart.cartTotalAmount,
    totalPrice: cart.cartTotalAmount,
    paidAt: Date.now(),
    paymentInfo: {
      id: "sample",
      status: "paid",
    },
    orderItems: orderItems,
  });

  const handleChan = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumber") {
      // Convert the value to a positive number
      const sanitizedValue = Math.max(0, Number(value));

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: sanitizedValue,
      }));
    }
    // Set other fields as string values
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      shippingFee: event.target.value,
      totalPrice: cart.cartTotalAmount + Number(event.target.value),
    }));
    if (event.target.value === "0") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        shippingMethod: "free",
      }));
    }
    if (event.target.value === "40") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        shippingMethod: "regular",
      }));
    }
    if (event.target.value === "100") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        shippingMethod: "express",
      }));
    }
  };
  // console.log(formData);
  const order = async (e) => {
    e.preventDefault();
    if (formData.shippingFee === 0) {
      Swal.fire("Bro!", "Please select a Shipping Method!", "warning");
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/order/new`, formData);

      if (data.success === true) {
        Swal.fire("GG!", "Order Placed!", "success");
        dispatch(clearCart());
        router.push("/");
      }
    } catch (error) {
      Swal.fire("Shit Bro!", error.message, "error");
    }
  };
  return (
    <form className=" jy cart" onSubmit={order}>
      <div className="checkout_ltr">
        <div className="checkout_shipping">
          <p>Shipping Address</p>
          <div className="checkout_">
            <div className="checkout__int">
              <p>First Name</p>
              <input
                required
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                onChange={handleChan}
                value={formData.firstName}
              />
            </div>
            <div className="checkout__int">
              <p>Last Name</p>
              <input
                required
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                onChange={handleChan}
                value={formData.lastName}
              />
            </div>
          </div>
          <div className="checkout_">
            <div className="checkout__int">
              <p>Email</p>
              <input
                required
                type="email"
                placeholder="Enter your email address"
                name="email"
                onChange={handleChan}
                value={formData.email}
              />
            </div>
            <div className="checkout__int">
              <p>Phone Number</p>
              <input
                required
                type="number"
                placeholder="Enter your phone number"
                name="phoneNumber"
                onChange={handleChan}
                value={formData.phoneNumber === 0 ? null : formData.phoneNumber}
              />
            </div>
          </div>
          <div className="checkout_">
            <div className="checkout__int">
              <p>House No and Street Address</p>
              <input
                required
                type="text"
                placeholder="Enter your House No and Street Address"
                name="streetAddress"
                onChange={handleChan}
                value={formData.streetAddress}
              />
            </div>
            <div className="checkout__int">
              <p>City</p>
              <input
                required
                type="text"
                placeholder="Enter your City"
                name="city"
                onChange={handleChan}
                value={formData.city}
              />
            </div>
          </div>
          <div className="checkout_">
            <div className="checkout__int">
              <p>State</p>
              <input
                required
                type="text"
                placeholder="Enter your State"
                name="state"
                onChange={handleChan}
                value={formData.state}
              />
            </div>
            <div className="checkout__int">
              <p>Postal Code</p>
              <input
                required
                type="text"
                placeholder="Enter your postal code"
                name="postalCode"
                onChange={handleChan}
                value={formData.postalCode === 0 ? null : formData.postalCode}
              />
            </div>
          </div>
        </div>
        <div className="checkout_shipping">
          <p>Shipping Methods</p>
          <div
            className={
              formData.shippingFee === "0"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingFee === "0"}
                onChange={handleChange}
                value={0}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <div className="met_">
                <p>Free Shipping</p>
                <p>7-30 business days</p>
              </div>
            </div>
            <p>₹0</p>
          </div>
          <div
            className={
              formData.shippingFee === "40"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingFee === "40"}
                onChange={handleChange}
                value="40"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <div className="met_">
                <p>Regular Shipping</p>
                <p>3-14 business days</p>
              </div>
            </div>
            <p>₹40</p>
          </div>
          <div
            className={
              formData.shippingFee === "100"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingFee === "100"}
                onChange={handleChange}
                value={100}
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
              <div className="met_">
                <p>Express Shipping</p>
                <p>1-3 business days</p>
              </div>
            </div>
            <p>₹100</p>
          </div>
        </div>
      </div>
      <div className="checkout_rtr">
        <p>Your Order</p>
        {cart &&
          cart.cartItems.map((item, index) => {
            return (
              <div className="checkout_prod" key={index}>
                <div className="checkout_prod_">
                  <div className="checkout_prod_img">
                    <Image
                      src={item.product.images[0].url}
                      width={150}
                      height={150}
                      alt={item.product.name}
                    />
                  </div>
                  <div className="checkout_prod_info">
                    <p>{item.product.name}</p>
                    <div>
                      <p>{item.product.color}</p>
                      {item.product.size}
                    </div>
                    <p>x {item.cartQuantity}</p>
                  </div>
                </div>
                <div className="checkout_prod__">
                  <p>
                    ₹
                    {item.product.salePrice !== 0
                      ? item.product.salePrice
                      : item.product.price}
                  </p>
                </div>
              </div>
            );
          })}
        <Divider />
        <p style={{ margin: "1rem 0", fontSize: "2rem", fontWeight: "600" }}>
          Discount Code
        </p>
        <div className="checkout_dis">
          <input type="text" placeholder="Add discount code" />
          <div>
            <p>Apply</p>
          </div>
        </div>
        <Divider />
        <div className="cart__subtotal" style={{ marginTop: "1rem" }}>
          <p>Subtotal</p>
          <p>₹{cart.cartTotalAmount}</p>
        </div>
        <div className="cart__subtotal" style={{ marginBottom: "1rem" }}>
          <p>Discount</p>
          <p>₹0</p>
        </div>
        <div className="cart__subtotal" style={{ marginBottom: "1rem" }}>
          <p>Shipping</p>
          <p>₹{formData.shippingFee}</p>
        </div>
        <Divider />
        <div className="cart__gTot">
          <p>Grand Total</p>
          <p>₹{cart.cartTotalAmount + Number(formData.shippingFee)}</p>
        </div>
        <button className="cart__cta" type="submit">
          <p>Order Now</p>
        </button>
      </div>
    </form>
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

export default Checkout;
