import { Divider, Radio } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const userid = Cookies.get("user");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    city: "",
    postalCode: 0,
    shippingMethod: "free",
    user: userid,
  });
  const handleChan = (event) => {
    const { name, value } = event.target;

    if (name === "phoneNumbe") {
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
      shippingMethod: event.target.value,
    }));
  };
  return (
    <div className=" jy cart">
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
          <div className="hk checkout__int">
            <p>Street name and House number</p>
            <input
              required
              type="number"
              placeholder="Enter your phone number"
              name="phoneNumber"
              onChange={handleChan}
              value={formData.phoneNumber === 0 ? null : formData.phoneNumber}
            />
          </div>
          <div className="checkout_">
            <div className="checkout__int">
              <p>City</p>
              <input
                required
                type="text"
                placeholder="Enter your city"
                name="city"
                onChange={handleChan}
                value={formData.city}
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
              formData.shippingMethod === "free"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingMethod === "free"}
                onChange={handleChange}
                value="free"
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
              formData.shippingMethod === "regular"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingMethod === "regular"}
                onChange={handleChange}
                value="regular"
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
              formData.shippingMethod === "express"
                ? "activem checkout_method"
                : "checkout_method"
            }
          >
            <div className="checkout_method_">
              <Radio
                checked={formData.shippingMethod === "express"}
                onChange={handleChange}
                value="express"
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
                  <p>₹{item.product.salePrice}</p>
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
        <Divider />
        <div className="cart__gTot">
          <p>Grand Total</p>
          <p>₹{cart.cartTotalAmount}</p>
        </div>
        <div className="cart__cta">
          <p>Order Now</p>
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

export default Checkout;
