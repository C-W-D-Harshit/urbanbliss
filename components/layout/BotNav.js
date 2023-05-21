import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";
import { AiOutlineShopping } from "react-icons/ai";
import { BiHomeAlt, BiSearchAlt } from "react-icons/bi";
import { MdOutlineAccountBox } from "react-icons/md";

const BotNav = () => {
  const token = Cookies.get("user");
  return (
    <div className="botNav">
      <Link href="/" className="botNav_">
        <BiHomeAlt />
      </Link>
      <Link href="/shop" className="botNav_">
        <AiOutlineShopping />
      </Link>
      <Link href="/search" className="botNav_">
        <BiSearchAlt />
      </Link>
      <Link href={token ? "/account" : "/signup"} className="botNav_">
        <MdOutlineAccountBox />
      </Link>
    </div>
  );
};

export default BotNav;
