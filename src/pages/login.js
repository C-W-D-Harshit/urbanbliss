import axios from "axios";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Swal from "sweetalert2";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password.length < 8) {
      // Password is less than 8 characters
      // You can display an error message or handle it as needed
      Swal.fire(
        "Bro!",
        "Password should be grater than 8 characters",
        "warning"
      );
      return;
    }
    try {
      const { data } = await axios.post(`/api/v1/login`, formData);

      if (data.success === true) {
        Cookies.set("user", JSON.stringify(data.user));
        Swal.fire("Good job!", "Logged In Successfully!", "success");
        router.push("/account");
      }
    } catch (error) {
      Swal.fire("Shit Bro!", error.response.data.message, "error");
    }
  };
  return (
    <>
      <Head>
        <title>Urban Bliss - Login</title>
        <meta name="description" content="Urban Bliss an Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <div className="signup">
        <Link href="/" className="signup_c">
          <AiOutlineClose />
        </Link>
        <div className="signup_img">
          <div>
            <Image src="/s2.jpg" alt="img" width={1000} height={1000} />
          </div>
        </div>
        <div className="signup_cont">
          <div>
            <div className="signup_tit">
              <p>Login!</p>
            </div>
            <div className="signup_form">
              <form onSubmit={handleSubmit}>
                <div className="signup_form_y">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email"
                  />
                  <p>@</p>
                </div>
                <div className="signup_form_y">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                  <p>@</p>
                </div>
                <div className="signup_but">
                  <button type="submit" className="signup_cta">
                    Login
                  </button>
                  <button
                    type="button"
                    className="gj signup_cta"
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (token) {
    const { res } = ctx;
    res.writeHead(302, { Location: "/account" });
    res.end();
    return {
      props: {},
    };
  }
  return {
    props: {},
  };
}

export default Signup;
