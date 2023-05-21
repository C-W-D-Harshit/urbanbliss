import { Badge } from "@mui/material";
import { parseCookies } from "nookies";
import React from "react";
import { AiOutlineArrowRight, AiOutlineBell } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { BsGraphUpArrow } from "react-icons/bs";
import { MdOutlineLibraryBooks } from "react-icons/md";

const Index = ({ user }) => {
  return (
    <div className="adminDash">
      <div className="adminDash_top">
        <p>
          Welcome, <span>{user.name}</span>
        </p>
        <div className="adminDash_user">
          <div className="adminDash_user_search">
            <input type="search" placeholder="Search for products..." />
            <BiSearch />
          </div>
          <div className="adminDash_user_">
            <Badge color="primary" variant="dot">
              <AiOutlineBell />
            </Badge>
          </div>
          <div className="adminDash_user_">
            <p>{user.name.charAt(0)}</p>
          </div>
        </div>
      </div>
      <div className="adminDash_cont">
        <div className="adminDash_cont_l">
          <div className="adminDash_cont_l_1">
            <div>
              <MdOutlineLibraryBooks />
              <div className="adminDash_cont_l_1_">
                <div className="adminDash_cont_l_1__">
                  <p>23789</p>
                  <div>
                    <p style={{ fontSize: "1.2rem" }}>+20</p>
                  </div>
                </div>
                <p>Orders</p>
              </div>
            </div>
            <div>
              <BsGraphUpArrow />
              <div className="adminDash_cont_l_1_">
                <div className="adminDash_cont_l_1__">
                  <p>56564</p>
                  <div>
                    <p style={{ fontSize: "1.2rem" }}>+29</p>
                  </div>
                </div>
                <p>Sales</p>
              </div>
            </div>
          </div>
        </div>
        <div className="adminDash_cont_r">
          <div className="adminDash_cont_r_">
            <p>Top Selling Products</p>
            <div>
              <p>See all</p>
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const { user } = parseCookies(ctx);
  const user_ = JSON.parse(user);
  return {
    props: {
      user: user_,
    },
  };
}

export default Index;
