import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../reducers/cartSlice";

const ProductCard = ({ id, name, price, salePrice, img, product }) => {
  const dispatch = useDispatch();
  const [prod, setProd] = useState(product);
  const ATC = {
    product: prod,
    count: 1,
  };
  const handleATC = () => {
    dispatch(addToCart(ATC));
  };
  return (
    <div className="productCard">
      <div className="productCard_img">
        <Link href={`/product/${id}`} className="productCard_img_">
          <Image src={img} alt={name} width={800} height={800} />
        </Link>
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
        <div className="productCard_atc" onClick={handleATC}>
          <AiOutlineShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
