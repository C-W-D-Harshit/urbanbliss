import React, { useState } from "react";
import Top_Header from "./Top_Header";
import Link from "next/link";
import { MdOutlineAccountBox } from "react-icons/md";
import Cookies from "js-cookie";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Header = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const count = useSelector((state) => state.cart.cartTotalQuantity);
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 8,
    },
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["About", "Shop", "Reviews", "Blog", "Contact"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText style={{ fontSize: "3rem" }} primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );

  const token = Cookies.get("user");

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
          <Link href="/shop" className="header__menu_">
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
          <form
            onClick={() => router.push("/search")}
            className="header__search"
          >
            <FiSearch />
            <input type="text" placeholder="Search" disabled />
          </form>
          <Link href="/cart" className="header__ico">
            <AiOutlineShoppingCart />
            <span>{count}</span>
          </Link>
          <Link href={token ? "/account" : "/login"} className="header__ico">
            <MdOutlineAccountBox />
          </Link>
          <div className="m header__ico">
            <React.Fragment key={"right"}>
              <Button onClick={toggleDrawer("right", true)}>
                <GiHamburgerMenu
                  style={{
                    fontSize: "3rem",
                    color: "black",
                  }}
                />
              </Button>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                {list("right")}
              </Drawer>
            </React.Fragment>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
