import React, { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { MdArrowLeft } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import baseUrl from "../../helpers/baseUrl";
import axios from "axios";

const ProductHolder = ({ title, feature }) => {
  const [products, setProducts] = useState([]);
  const getProductData = async () => {
    try {
      const response = await axios.get(`/api/v1/products/${feature}`); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      console.log(productData); // Output the product data to the console or use it as needed
      setProducts(productData.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);
  const scrollRef = useRef(null);
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 315; // adjust scroll distance as needed
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 315; // adjust scroll distance as needed
    }
  };

  return (
    <>
      {products.length !== 0 && (
        <div className="proHold">
          <div className="proHold_tit">
            <p>{title}</p>
            <div className="proHold_cta">
              <div onClick={handleScrollLeft}>
                <AiOutlineLeft />
              </div>
              <div onClick={handleScrollRight}>
                <AiOutlineRight />
              </div>
            </div>
          </div>
          <div className="proHold_" ref={scrollRef}>
            {products &&
              products.map((product) => {
                return (
                  <ProductCard
                    img={product.images[0].url}
                    name={product.name}
                    price={product.price}
                    salePrice={product.salePrice}
                    id={product._id}
                    key={product._id}
                    product={product}
                  />
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductHolder;
