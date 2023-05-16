import React from "react";
import ProductCard from "./ProductCard";
import { MdArrowLeft } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const ProductHolder = ({ title, feature }) => {
  return (
    <div className="proHold">
      <div className="proHold_tit">
        <p>{title}</p>
        <div className="proHold_cta">
          <div>
            <AiOutlineLeft />
          </div>
          <div>
            <AiOutlineRight />
          </div>
        </div>
      </div>
      <div className="proHold_">
        <ProductCard
          img="/d1.jpg"
          name="Blue Tshirt"
          price="100"
          salePrice="90"
          id="1"
        />
        <ProductCard
          img="/d1.jpg"
          name="Blue Tshirt"
          price="100"
          salePrice="90"
          id="2"
        />
        <ProductCard
          img="/d1.jpg"
          name="Blue Tshirt"
          price="100"
          salePrice="90"
          id="3"
        />
        <ProductCard
          img="/d1.jpg"
          name="Blue Tshirt"
          price="100"
          //   salePrice="90"
          id="4"
        />
      </div>
    </div>
  );
};

export default ProductHolder;
