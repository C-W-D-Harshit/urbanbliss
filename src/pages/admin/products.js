import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ProductCard from "../../../components/admin/product/ProductCard";
import baseUrl from "../../../helpers/baseUrl";
import axios from "axios";
import Link from "next/link";

const Products = ({ products }) => {
  return (
    <div className="admin_products">
      <div className="admin_products_hold">
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
              />
            );
          })}
      </div>
      <Link href={`/admin/product/new`}>
        <AiOutlinePlus />
      </Link>
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const currentUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Use 'http' as default if no protocol header is present
  const fullUrl = `${protocol}://${currentUrl}`;
  const url = `${fullUrl}/api/v1/admin/products`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      props: {
        products: data.products,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        error: "Failed to fetch data",
      },
    };
  }
}

export default Products;
