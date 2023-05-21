import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillEdit, AiOutlineShoppingCart } from "react-icons/ai";

const ProductCard = ({ id, name, price, salePrice, img }) => {
  return (
    <Link href={`/admin/product/${id}`} className="productCard">
      <div className="productCard_img">
        <div className="productCard_img_">
          <Image src={img} alt={name} width={800} height={800} />
        </div>
        {salePrice !== 0 && (
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
              ₹{salePrice !== 0 ? salePrice : price}
            </p>
            <div>{salePrice !== 0 && <p>₹{price}</p>}</div>
          </div>
        </div>
        <div className="productCard_atc">
          <AiFillEdit />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
