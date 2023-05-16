import React from "react";

const Top_Header = () => {
  return (
    <div className="topHeader">
      <div>
        <p style={{ marginRight: "1rem" }}>
          Sign up and <span style={{ fontWeight: "bold" }}>GET 20% OFF</span>{" "}
          for your first order.
        </p>
        <p style={{ textDecoration: "underline", cursor: "pointer" }}>
          Sign up now
        </p>
      </div>
    </div>
  );
};

export default Top_Header;
