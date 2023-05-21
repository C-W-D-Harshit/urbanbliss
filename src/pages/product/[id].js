import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/loader/Loader";
import Swal from "sweetalert2";
import Head from "next/head";
import ReactStars from "react-stars";
import { Divider } from "@mui/material";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { patc } from "../../../reducers/cartSlice";

const ProductDetail = ({ product, error }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(null);
  const [images, setImages] = useState(null);
  const [ic, setIC] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedSize, setSelectedSize] = useState(0);
  const [prod, setProd] = useState(false);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [oProduct, setOProduct] = useState(null);

  const handleMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handlePlus = () => {
    if ((count > 1, count < product.stock, count < 10)) {
      setCount(count + 1);
    }
  };

  const handleSizeClick = (siz, index) => {
    setActiveSize(index === activeSize ? 0 : index);
    setSelectedSize(index === activeSize ? 0 : siz);
    setSize(siz);
    setActiveColor(false);
    const selectedOption = product.sizeOptions.find(
      (option) => option.size === siz && option.color === color
    );

    if (selectedOption) {
      setProd((prevProduct) => ({
        ...prevProduct,
        price: selectedOption.price,
        salePrice: selectedOption.salePrice,
      }));
    }
  };

  const handleColorClick = (col, index) => {
    setProd(product);
    setActiveColor(index === activeColor ? null : index);
    setColor(col);
    const selectedOption = product.sizeOptions.find(
      (option) => option.size === size && option.color === col
    );

    if (selectedOption) {
      setProd((prevProduct) => ({
        ...prevProduct,
        sizeOptions: selectedOption._id,
        price: selectedOption.price,
        salePrice: selectedOption.salePrice,
        size: selectedOption.size,
        color: selectedOption.color,
      }));
    }
  };
  useEffect(() => {
    setProducts(product);
  }, []);

  const addToCart = () => {
    if (product.sizeOptions.length !== 0 && prod === false) {
      Swal.fire("Bro!", "Select Size and Color", "warning");
      return;
    }
    if (activeColor === false) {
      Swal.fire("Bro!", "Select Size and Color", "warning");
      return;
    }
    const ATC = {
      product: prod ? prod : product,
      count,
    };
    dispatch(patc(ATC));
    Swal.fire("Yu Hoooo!", "Product added to Cart!", "success");
  };

  if (!products) {
    return <Loader />;
  }
  const title = `Urban Bliss - ${product.name}`;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="productDetail">
        <div className="breadCrumb">
          <p style={{ textTransform: "uppercase" }}>
            SHOP / {product.category} /{" "}
            <span style={{ fontWeight: "bolder" }}>{product.name}</span>
          </p>
        </div>
        <div className="productDetail_">
          <div className="productDetail_img">
            <div className="productDetail_img_main">
              <Image
                src={products.images[ic].url}
                width={600}
                height={600}
                alt={products.images[ic].public_id}
                priority
                quality={100}
              />
            </div>
            <div className="productDetail_img_sec">
              {products.images &&
                products.images.map((image, index) => {
                  return (
                    <>
                      <div
                        className="productDetail_img_sec_"
                        key={product.images._id}
                        onClick={() => setIC(index)}
                      >
                        <Image
                          src={image.url}
                          alt={image.public_id}
                          width={200}
                          height={200}
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="productDetail_c">
            <div className="productDetail1">
              <div className="productDetail_name">
                <p>{product.name}</p>
              </div>
              <div className="productDetail_sdesc">
                <p>{product.shortDescription}</p>
              </div>
              <div className="productDetail_rating">
                <ReactStars
                  value={product.ratings}
                  color2="#f9cf51"
                  edit={false}
                  half={true}
                  size={30}
                />
                {""}
                <div>({product.numOfReviews})</div>
              </div>
              <div className="productDetail_price">
                <p>
                  ₹
                  {prod
                    ? prod.salePrice !== 0
                      ? prod.salePrice
                      : prod.price
                    : product.salePrice !== 0
                    ? product.salePrice
                    : product.price}{" "}
                  <span style={{ display: product.salePrice === 0 && "none" }}>
                    ₹{product.price}
                  </span>
                </p>
              </div>
              <Divider />
            </div>
            {product.sizeOptions.length !== 0 && (
              <>
                <div className="productDetail2">
                  <div className="productDetail_sz">
                    <p>Available Sizes</p>
                    <div className="productDetail_size">
                      {product.sizeOptions
                        .reduce((uniqueSizes, sizeOption) => {
                          if (!uniqueSizes.includes(sizeOption.size)) {
                            uniqueSizes.push(sizeOption.size);
                          }
                          return uniqueSizes;
                        }, [])
                        .map((size, index) => {
                          return (
                            <div
                              className={
                                activeSize === index
                                  ? "activeSize productDetail_szx"
                                  : "productDetail_szx"
                              }
                              key={size}
                              onClick={() => handleSizeClick(size, index)}
                            >
                              {size}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="productDetail_sz">
                    <p>Available Colors</p>
                    <div className="productDetail_size">
                      {product.sizeOptions
                        .filter(
                          (sizeOption) => sizeOption.size === selectedSize
                        )
                        .reduce((uniqueColors, sizeOption) => {
                          if (!uniqueColors.includes(sizeOption.color)) {
                            uniqueColors.push(sizeOption.color);
                          }
                          return uniqueColors;
                        }, [])
                        .map((color, index) => {
                          return (
                            <div
                              key={color}
                              className={
                                activeColor === index
                                  ? "activeColor productDetail_color"
                                  : "productDetail_color"
                              }
                              onClick={() => handleColorClick(color, index)}
                            >
                              <div style={{ backgroundColor: color }} />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <Divider />
              </>
            )}
            <div className="productDetail3">
              {product.stock <= 10 && (
                <div className="productDetail_stock">
                  <p>
                    <b>Only {product.stock} products left</b> - make it yours!
                  </p>
                </div>
              )}
              <div className="productDetail_bts">
                <div className="productDetail_counter">
                  <AiOutlineMinus onClick={handleMinus} />
                  <p>{count}</p>
                  <AiOutlinePlus onClick={handlePlus} />
                </div>
                <div className="productDetail_atc" onClick={addToCart}>
                  <p>Add to Cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params: { id }, req, res }) {
  const currentUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Use 'http' as default if no protocol header is present
  const fullUrl = `${protocol}://${currentUrl}`;
  const url = `${fullUrl}/api/v1/product/${id}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data);
    return {
      props: {
        product: data.product,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.writeHead(302, { Location: "/shop" });
    res.end();
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default ProductDetail;
