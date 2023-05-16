import Link from "next/link";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHomeAlt, BiSearchAlt } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { MdAccountBox, MdOutlineAccountBox } from "react-icons/md";

const BotNav = () => {
  return (
    <div className="botNav">
      <Link href="/" className="botNav_">
        <BiHomeAlt />
      </Link>
      <Link href="/" className="botNav_">
        <BiSearchAlt />
      </Link>
      <Link href="/" className="botNav_">
        <AiOutlineHeart />
      </Link>
      <Link href="/" className="botNav_">
        <MdOutlineAccountBox />
      </Link>
    </div>
  );
};

export default BotNav;
