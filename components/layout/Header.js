import React, { useState } from "react";
import Top_Header from "./Top_Header";
import Link from "next/link";
import { MdOutlineAccountBox } from "react-icons/md";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;

      if (scrollTop > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <Top_Header />
      <div className={scrolled ? "mhead header" : "header"}>
        <Link href="/" className="header__logo">
          <p>Urban Bliss</p>
        </Link>
        <div className="header__menu">
          <Link href="/" className="header__menu_">
            <p>Shop</p>
          </Link>
          <Link href="/" className="header__menu_">
            <p>Trending</p>
          </Link>
          <Link href="/" className="header__menu_">
            <p>New Arrival</p>
          </Link>
          <Link href="/" className="header__menu_">
            <p>Brands</p>
          </Link>
        </div>
        <div className="header__user">
          <div className="header__search">
            <FiSearch />
            <input type="text" placeholder="Search" />
          </div>
          <Link href="/" className="header__ico">
            <AiOutlineShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/" className="header__ico">
            <MdOutlineAccountBox />
          </Link>
          <Link href="/" className="m header__ico">
            <GiHamburgerMenu />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
