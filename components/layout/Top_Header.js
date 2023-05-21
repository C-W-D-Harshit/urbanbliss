import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";

const Top_Header = () => {
  const token = Cookies.get("user");
  return (
    <div className="topHeader">
      <div>
        <p style={{ marginRight: "1rem" }}>
          Sign up and <span style={{ fontWeight: "bold" }}>GET 20% OFF</span>{" "}
          for your first order.
        </p>
        <Link href={token ? "/account" : "/signup"}>
          <p style={{ textDecoration: "underline", cursor: "pointer" }}>
            Sign up now
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Top_Header;
