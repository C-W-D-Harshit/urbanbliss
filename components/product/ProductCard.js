import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ id, name, price, salePrice, img }) => {
  return (
    <Link href={`/product/${id}`} className="productCard">
      <div className="productCard_img">
        <div className="productCard_img_">
          <Image src={img} alt={name} width={800} height={800} />
        </div>
        {salePrice && (
          <div className="productCard_sale">
            <p>Sale</p>
          </div>
        )}
      </div>
      <div className="productCard_info">
        <div className="productCard_">
          <p>{name}</p>
          <div>
            <p style={{ marginRight: "1rem" }}>
              ₹{salePrice ? salePrice : price}
            </p>
            <div>{salePrice && <p>₹{price}</p>}</div>
          </div>
        </div>
        <div className="productCard_atc">
          <AiOutlineShoppingCart />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
