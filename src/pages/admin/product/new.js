import {
  Button,
  FormControl,
  FormControlLabel,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineCloudUpload,
} from "react-icons/ai";
import Swal from "sweetalert2";

const New = () => {
  const [text, setText] = useState("");
  const [age, setAge] = React.useState("");
  const [vart, setVart] = useState(false);
  const [rendiv, setRendiv] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const clothingCategories = [
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

  const handleChang = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const textareaStyles = {
    minHeight: "100px",
    resize: "vertical",
  };
  const [selectedImages, setSelectedImages] = useState([]);
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    const imagesArray = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onloadend = () => {
        imagesArray.push(reader.result);

        if (imagesArray.length === files.length) {
          setSelectedImages(imagesArray);
          console.log(selectedImages);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };
  const user_ = Cookies.get("user");
  let user = "";
  let userid = "";
  if (user_) {
    user = JSON.parse(user_);
    userid = user._id;
  }

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    brand: "",
    shortDescription: "",
    sku: "",
    price: 0,
    salePrice: 0,
    images: [],
    stock: 0,
    category: "",
    user: userid,
  });
  const handleChan = (event) => {
    const { name, value } = event.target;

    if (name === "price" || name === "salePrice" || name === "stock") {
      // Convert the value to a positive number
      const sanitizedValue = Math.max(0, Number(value));

      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: sanitizedValue,
      }));
    }
    // Set other fields as string values
    else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  if (loading) {
    return (
      <div className="load_box">
        <div className="loader">
          <svg viewBox="0 0 80 80">
            <circle id="test" cx="40" cy="40" r="32"></circle>
          </svg>
        </div>

        <div className="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className="loader">
          <svg viewBox="0 0 80 80">
            <rect x="8" y="8" width="64" height="64"></rect>
          </svg>
        </div>
      </div>
    );
  }
  const handleAddVariation = () => {
    setRendiv([...rendiv, { size: "", color: "", price: "", salePrice: "" }]);
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...rendiv];
    updatedVariations.splice(index, 1);
    setRendiv(updatedVariations);
  };

  const handleVariationChange = (index, field, value) => {
    const updatedVariations = [...rendiv];
    updatedVariations[index][field] = value;
    setRendiv(updatedVariations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedImages.forEach((image) => {
      formData.images.push(image);
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    setLoading(true);
    // Check if vart is true
    if (vart) {
      // Create a copy of the formData object
      const updatedFormData = { ...formData };

      // Create an array to hold the variations
      const sizeOptions = [];

      // Iterate over the rendiv array and add variations to sizeOptions
      rendiv.forEach((variation) => {
        const { size, color, price, salePrice } = variation;
        sizeOptions.push({ size, color, price, salePrice });
      });

      // Update the sizeOptions property of the formData object
      updatedFormData.sizeOptions = sizeOptions;

      // Update the formData state with the updatedFormData object
      setFormData(updatedFormData);

      // Perform form submission and handle response
      try {
        const { data } = await axios.post(
          `/api/v1/admin/product/new`,
          updatedFormData,
          config
        );
        Swal.fire("Good job!", "Product Created Successfully!", "success");
        router.push("/admin/products");
      } catch (error) {
        Swal.fire("Shit Bro!", error.response.data.message, "error");
      }
      console.log(updatedFormData);
    } else {
      // setLoading(true);
      try {
        const { data } = await axios.post(
          `/api/v1/admin/product/new`,
          formData,
          config
        );
        if (data.success === true) {
          Swal.fire("Good job!", "Product Created Successfully!", "success");
          // router.push("/admin/products");
        }
      } catch (error) {
        Swal.fire("Shit Bro!", error.response.data.message, "error");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="newProduct">
      <div className="newProduct_top">
        <Link href={`/admin/products`}>
          <AiOutlineArrowLeft />
        </Link>
        <div className="newProduct_top_">
          <p>Back to product list</p>
          <p>Add New Product</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="newProduct_main">
        <div className="newProduct_main_">
          <div className="newProduct_desc">
            <p>Description</p>
            <div className="newProduct_desc_">
              <div className="newProduct_name">
                <p>Product Name</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="text"
                    placeholder="Product Name"
                    name="name"
                    onChange={handleChan}
                    value={formData.name}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>Product Slug</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="text"
                    placeholder="Product-Slug"
                    name="slug"
                    onChange={handleChan}
                    value={formData.slug}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>Product Brand</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="text"
                    placeholder="Product Brand"
                    name="brand"
                    onChange={handleChan}
                    value={formData.brand}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>Short Description</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="text"
                    placeholder="Short Description"
                    name="shortDescription"
                    onChange={handleChan}
                    value={formData.shortDescription}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>Product Description</p>
                <textarea
                  value={formData.description}
                  name="description"
                  onChange={handleChan}
                  style={textareaStyles}
                />
              </div>
            </div>
          </div>
          <div className="newProduct_desc">
            <p>Category</p>
            <div className="newProduct_desc_">
              <div className="newProduct_name">
                <p style={{ marginBottom: "1rem" }}>Product Category</p>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={formData.category}
                    label="Age"
                    name="category"
                    onChange={handleChan}
                  >
                    {clothingCategories &&
                      clothingCategories.map((category, index) => {
                        return (
                          <MenuItem key={index} value={category.value}>
                            {category.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
          <div className="newProduct_desc">
            <p>Inventory</p>
            <div className="newProduct_desc_">
              <div className="newProduct_name">
                <p>Stock</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="number"
                    placeholder="Product Stock"
                    name="stock"
                    value={formData.stock === 0 ? "" : formData.stock}
                    onChange={handleChan}
                    min={0}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>SKU</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="text"
                    placeholder="Product SKU"
                    name="sku"
                    onChange={handleChan}
                    value={formData.sku}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="newProduct_main__">
          <div className="newProduct_desc">
            <p>Product Images</p>

            <div className="newProduct_desc_">
              <div className="newProduct_img_hold">
                <div className="newProduct_up">
                  <AiOutlineCloudUpload
                    style={{ fontSize: "1.5rem", color: "var(--red)" }}
                  />
                  <label
                    htmlFor="fileInput"
                    style={{ display: "block", cursor: "pointer" }}
                  >
                    Select Image
                  </label>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    multiple
                    required
                  />
                </div>
                {selectedImages.map((image, index) => (
                  <div key={index} className="newProduct_up">
                    <Image
                      src={image}
                      alt={`Selected Image ${index + 1}`}
                      width={100}
                      height={100}
                      className="newProduct_img_img"
                    />
                    <AiOutlineClose
                      className="newProduct_re_img"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="newProduct_desc">
            <p>Pricing</p>
            <div className="newProduct_desc_">
              <div className="newProduct_name">
                <p>Product Price</p>
                <div className="newProduct_name_">
                  <input
                    required
                    type="number"
                    placeholder="Product Price"
                    name="price"
                    onChange={handleChan}
                    value={formData.price === 0 ? "" : formData.price}
                    min={0}
                  />
                </div>
              </div>
              <div className="newProduct_name">
                <p>Sale Price (optional)</p>
                <div className="newProduct_name_">
                  <input
                    type="number"
                    placeholder="Product Sale Price"
                    name="salePrice"
                    onChange={handleChan}
                    value={formData.salePrice === 0 ? "" : formData.salePrice}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="newProduct_desc">
            <div>
              <FormControlLabel
                control={
                  <Switch checked={vart} onChange={() => setVart(!vart)} />
                }
                label="Enable Variations"
              />
              {vart && (
                <div>
                  {rendiv.map((variation, index) => (
                    <div key={index}>
                      <FormControl>
                        <InputLabel htmlFor={`size-${index}`}>Size</InputLabel>
                        <Select
                          id={`size-${index}`}
                          value={variation.size}
                          onChange={(e) =>
                            handleVariationChange(index, "size", e.target.value)
                          }
                        >
                          <MenuItem value="S">S</MenuItem>
                          <MenuItem value="M">M</MenuItem>
                          <MenuItem value="L">L</MenuItem>
                          <MenuItem value="XL">XL</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl>
                        <InputLabel htmlFor={`color-${index}`}>
                          Color
                        </InputLabel>
                        <Input
                          id={`color-${index}`}
                          value={variation.color}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "color",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel htmlFor={`price-${index}`}>
                          Price
                        </InputLabel>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          value={variation.price}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "price",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <FormControl>
                        <InputLabel htmlFor={`salePrice-${index}`}>
                          Sale Price
                        </InputLabel>
                        <Input
                          id={`salePrice-${index}`}
                          type="number"
                          value={variation.salePrice}
                          onChange={(e) =>
                            handleVariationChange(
                              index,
                              "salePrice",
                              e.target.value
                            )
                          }
                        />
                      </FormControl>
                      <Button onClick={() => handleRemoveVariation(index)}>
                        Remove Variation
                      </Button>
                    </div>
                  ))}
                  <Button onClick={handleAddVariation}>Add Variation</Button>
                </div>
              )}
            </div>
          </div>
          <button type="submit" className="newProduct_cta">
            <p>Add Product</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default New;
