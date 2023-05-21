import Image from "next/image";
import React from "react";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeCartItem,
} from "../../reducers/cartSlice";
import Link from "next/link";
import { Divider } from "@mui/material";
import Swal from "sweetalert2";

const Cart = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const ct = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const handleMinus = (product) => {
    dispatch(decreaseCartQuantity(product));
  };
  const handlePlus = (product) => {
    dispatch(increaseCartQuantity(product));
  };
  const handleRemove = (product) => {
    dispatch(removeCartItem(product));
  };
  const clearCar = (a) => {
    dispatch(clearCart(a));
  };
  const n = () => {
    console.log("noob");
  };
  const check = () => {
    if (items.length === 0) {
      Swal.fire("Bro!", "Please add products first!", "warning");
    }
  };
  return (
    <div className="cart">
      <div className="cart_">
        <div className="cart_top">
          <p>Cart</p>
          <div
            onClick={() => {
              items.length !== 0 ? clearCar() : n();
            }}
          >
            <AiOutlineDelete style={{ marginRight: "1rem" }} />
            <p>Remove</p>
          </div>
        </div>
        {items.length !== 0 ? (
          <table className="cart_table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {items &&
                items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <Link
                          href={`/product/${item.product._id}`}
                          className="cart_table_product"
                        >
                          <div className="cart_table_product_img">
                            <Image
                              src={item.product.images[0].url}
                              width={200}
                              height={200}
                              alt={item.product.name}
                            />
                          </div>
                          <div className="cart_table_product_info">
                            <p>{item.product.name}</p>
                            {item.product.size && (
                              <div className="cart_table_product_var">
                                <p
                                  style={{
                                    marginRight: "1rem",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  {item.product.color}
                                </p>
                                <p>{item.product.size}</p>
                              </div>
                            )}
                          </div>
                        </Link>
                      </td>
                      <td>
                        <div className="cart_fart">
                          <div className="ggth productDetail_counter">
                            <AiOutlineMinus
                              onClick={() => {
                                handleMinus(item.product);
                              }}
                            />
                            <p>{item.cartQuantity}</p>
                            <AiOutlinePlus
                              onClick={() => {
                                handlePlus(item.product);
                              }}
                            />
                          </div>
                          <div
                            className="cart_item_remove"
                            onClick={() => handleRemove(item.product)}
                          >
                            <AiOutlineDelete />
                            <p>Remove</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="cart_p">
                          ₹
                          {item.product.salePrice !== 0
                            ? item.product.salePrice * item.cartQuantity
                            : item.product.price * item.cartQuantity}{" "}
                          <span>
                            ₹
                            {item.product.salePrice !== 0 &&
                              item.product.price * item.cartQuantity}
                          </span>
                        </p>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="cart_em">
            <h1>Your Cart is Empty!</h1>

            <Link href={`/shop`}>
              <h3>Start Shopping!</h3>
            </Link>
          </div>
        )}
      </div>
      <div className="cart__">
        <div className="cart__subtotal">
          <p>Subtotal</p>
          <p>₹{ct.cartTotalAmount}</p>
        </div>
        <div className="cart__subtotal" style={{ marginBottom: "1rem" }}>
          <p>Discount</p>
          <p>₹0</p>
        </div>
        <Divider />
        <div className="cart__gTot">
          <p>Grand Total</p>
          <p>₹{ct.cartTotalAmount}</p>
        </div>
        <div className="cart__cta" onClick={() => check()}>
          <p>Checkout Now</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
