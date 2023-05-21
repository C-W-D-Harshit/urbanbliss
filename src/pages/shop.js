import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import ProductCard from "../../components/product/ProductCard";
import {
  Box,
  Button,
  Drawer,
  List,
  Pagination,
  Slider,
  Stack,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSliders } from "react-icons/bs";
import { MdSort } from "react-icons/md";

function valuetext(value) {
  return `${value}°C`;
}

const Shop = ({ products, data }) => {
  const [catDrop, setCatDrop] = useState(false);
  const [filDrop, setFilDrop] = useState(true);
  const [price, setPrice] = React.useState([0, 10000]);
  const [ratings, setRatings] = React.useState([5]);
  const [page, setPage] = React.useState();
  const [filter, setFilter] = useState(false);
  const handlePageChange = async (event, value) => {
    setPage(value);
    setCl(false);
    try {
      const response = await axios.get(
        `/api/v1/products?price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[lte]=${ratings}&page=${value}`
      ); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      setProductss(productData.products);
      if (productData.products.length === 0) {
        handlePageChange(page - 1);
      }
      if (filter && data.filteredProductsCount < data.resultPerPage) {
        totPages = 1;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handlePriceChange = async (event, newValue) => {
    setFilter(true);
    setPrice(newValue);
    setCl(false);
    try {
      const response = await axios.get(
        `/api/v1/products?price[lte]=${newValue[1]}&price[gte]=${newValue[0]}&ratings[lte]=${ratings}&page=${page}`
      ); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      setProductss(productData.products);
      if (productData.products.length === 0) {
        handlePageChange(page - 1);
      }
      if (filter && data.filteredProductsCount < data.resultPerPage) {
        totPages = 1;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const handleRatingsChange = async (event, newValue) => {
    setFilter(true);
    setRatings(newValue);
    setCl(false);
    try {
      const response = await axios.get(
        `/api/v1/products?price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[lte]=${newValue}&page=${page}`
      ); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      setProductss(productData.products);
      if (productData.products.length === 0) {
        handlePageChange(page - 1);
      }
      if (filter && data.filteredProductsCount < data.resultPerPage) {
        totPages = 1;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  const [category, setCategory] = useState(null);
  const [productss, setProductss] = useState(null);
  const [cl, setCl] = useState(false);
  useEffect(() => {
    setProductss(products);
  }, []);

  const categories = [
    { name: "Women's Tops", value: "womens-tops" },
    { name: "Women's Dresses", value: "womens-dresses" },
    { name: "Women's Bottoms", value: "womens-bottoms" },
    { name: "Women's Activewear", value: "womens-activewear" },
    { name: "Women's Outerwear", value: "womens-outerwear" },
    { name: "Women's Swimwear", value: "womens-swimwear" },
    {
      name: "Women's Lingerie and Sleepwear",
      value: "womens-lingerie-and-sleepwear",
    },
    { name: "Men's Shirts", value: "mens-shirts" },
    { name: "Men's T-shirts", value: "mens-t-shirts" },
    { name: "Men's Pants", value: "mens-pants" },
    { name: "Men's Shorts", value: "mens-shorts" },
    { name: "Men's Activewear", value: "mens-activewear" },
    { name: "Men's Outerwear", value: "mens-outerwear" },
    { name: "Kids' Clothing", value: "kids-clothing" },
    { name: "Baby Clothing", value: "baby-clothing" },
    { name: "Maternity Clothing", value: "maternity-clothing" },
    { name: "Plus Size Clothing", value: "plus-size-clothing" },
    { name: "Formal Wear", value: "formal-wear" },
    { name: "Casual Wear", value: "casual-wear" },
    { name: "Vintage Clothing", value: "vintage-clothing" },
  ];
  const categoryHandler = async (v) => {
    setProductss(null);
    setCategory(v);
    try {
      const response = await axios.get(`/api/v1/products?category=${v}`); // Replace "/api/products" with your server endpoint URL
      const productData = response.data; // Assuming the response data is in JSON format
      setProductss(productData.products);
      if (productData.products.length === 0) {
        handlePageChange(page - 1);
      }
      if (filter && data.filteredProductsCount < data.resultPerPage) {
        totPages = 1;
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  let totPages = filter
    ? Math.ceil(data.productsCount / data.resultPerPage)
    : Math.ceil(data.productsCount / data.resultPerPage);

  // filters for mob

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
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
          <div className="shop_cate">
            <div className="shop_cate_shop">
              <p onClick={toggleDrawer(anchor, false)}>Category</p>
              <AiFillCaretDown
                onClick={() => setCatDrop(!catDrop)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="shop_cate_">
              {catDrop &&
                categories.map((categor, index) => {
                  return (
                    <p
                      key={index}
                      style={{
                        margin: ".5rem",
                        color: cl === index ? "var(--red)" : "var(--black)",
                      }}
                      onClick={() => {
                        categoryHandler(categor.value);
                        setCl(index);
                      }}
                    >
                      {categor.name}
                    </p>
                  );
                })}
            </div>
          </div>
          <div className="shop_cate">
            <div className="shop_cate_shop">
              <p>Filters</p>
              <AiFillCaretDown
                onClick={() => setCatDrop(!filDrop)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="shop_cate_">
              {filDrop && (
                <>
                  <div className="shop_filter_price">
                    <p>Price</p>
                    <Slider
                      getAriaLabel={() => "Temperature range"}
                      value={price}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      step={1000}
                      marks
                      min={0}
                      max={10000}
                    />
                  </div>
                  <div className="shop_filter_price">
                    <p>Ratings</p>
                    <Slider
                      aria-label="Temperature"
                      getAriaValueText={valuetext}
                      onChange={handleRatingsChange}
                      valueLabelDisplay="auto"
                      step={1}
                      marks
                      min={0}
                      max={5}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </List>
      </Box>
    </ThemeProvider>
  );
  const fist = (anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List></List>
      </Box>
    </ThemeProvider>
  );

  return (
    <div className="shop">
      <div className="shop_mob">
        <div className="mob_filt">
          <React.Fragment key={"left"}>
            <Button onClick={toggleDrawer("left", true)}>
              <MdSort
                style={{
                  fontSize: "2rem",
                  color: "black",
                }}
              />
            </Button>
            <Drawer
              anchor={"left"}
              open={state["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {fist("left")}
            </Drawer>
          </React.Fragment>
        </div>
        <div className="mob_filt">
          <React.Fragment key={"right"}>
            <Button onClick={toggleDrawer("right", true)}>
              <BsSliders
                style={{
                  fontSize: "2rem",
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
      <div className="shop_">
        <div className="shop_cate">
          <div className="shop_cate_shop">
            <p>Category</p>
            <AiFillCaretDown
              onClick={() => setCatDrop(!catDrop)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="shop_cate_">
            {catDrop &&
              categories.map((categor, index) => {
                return (
                  <p
                    key={index}
                    style={{
                      margin: ".5rem",
                      color: cl === index ? "var(--red)" : "var(--black)",
                    }}
                    onClick={() => {
                      categoryHandler(categor.value);
                      setCl(index);
                    }}
                  >
                    {categor.name}
                  </p>
                );
              })}
          </div>
        </div>
        <div className="shop_cate">
          <div className="shop_cate_shop">
            <p>Filters</p>
            <AiFillCaretDown
              onClick={() => setCatDrop(!filDrop)}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="shop_cate_">
            {filDrop && (
              <>
                <div className="shop_filter_price">
                  <p>Price</p>
                  <Slider
                    getAriaLabel={() => "Temperature range"}
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    step={1000}
                    marks
                    min={0}
                    max={10000}
                  />
                </div>
                <div className="shop_filter_price">
                  <p>Ratings</p>
                  <Slider
                    aria-label="Temperature"
                    getAriaValueText={valuetext}
                    onChange={handleRatingsChange}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={5}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="shop__">
        <div className="shop_hold">
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
                  product={product}
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
    </div>
  );
};

export async function getServerSideProps({ req }) {
  const currentUrl = req.headers.host;
  const protocol = req.headers["x-forwarded-proto"] || "http"; // Use 'http' as default if no protocol header is present
  const fullUrl = `${protocol}://${currentUrl}`;
  const url = `${fullUrl}/api/v1/products`;
  try {
    const response = await axios.get(url);
    const data = response.data;

    return {
      props: {
        products: data.products,
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

export default Shop;
