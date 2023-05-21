import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/product/ProductCard";
import { Pagination } from "@mui/material";

const SearchResult = ({ products, keyword, data }) => {
  const [productss, setProductss] = useState(null);
  const [page, setPage] = React.useState(1);
  useEffect(() => {
    setProductss(products);
  }, []);
  const handlePageChange = async (event, value) => {
    setProductss(null);
    setPage(value);
    try {
      const response = await axios.get(
        `/api/v1/products?keyword=${keyword}}&page=${value}`
      ); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      setProductss(productData.products);
      if (productData.products.length === 0) {
        handlePageChange(page - 1);
      }
      if (data.filteredProductsCount < data.resultPerPage) {
        totPages = 1;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  let totPages = Math.ceil(data.productsCount / data.resultPerPage);
  return (
    <div className={`search_product_holder`}>
      <div className="s_h">
        {productss &&
          productss.map((product, index) => {
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
      {data.filteredProductsCount >= data.resultPerPage &&
        data.resultPerPage < data.productsCount && (
          <Pagination
            count={totPages}
            size="large"
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        )}
    </div>
  );
};

export async function getServerSideProps({ params: { keyword }, req }) {
  const currentUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Use 'http' as default if no protocol header is present
  const fullUrl = `${protocol}://${currentUrl}`;
  const url = `${fullUrl}/api/v1/products?keyword=${keyword}`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      props: {
        products: data.products,
        keyword,
        data,
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

export default SearchResult;
