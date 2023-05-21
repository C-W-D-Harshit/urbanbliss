const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (val) {
          return Number.isInteger(val);
        },
        message: "Price must be an integer.",
      },
    },
    salePrice: {
      type: Number,
      min: 0,
      default: 0,
      validate: {
        validator: function (val) {
          return Number.isInteger(val);
        },
        message: "Sale price must be an integer.",
      },
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    dod: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    newArrival: {
      type: Boolean,
      default: true,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sizeOptions: {
      type: [
        {
          size: {
            type: String,
            required: true,
          },
          color: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
            min: 0,
            validate: {
              validator: function (val) {
                return Number.isInteger(val);
              },
              message: "Price must be an integer.",
            },
          },
          salePrice: {
            type: Number,
            required: true,
            min: 0,
            validate: {
              validator: function (val) {
                return Number.isInteger(val);
              },
              message: "Sale Price must be an integer.",
            },
          },
        },
      ],
      validate: [
        sizeOptionsValidator,
        "Size options must be unique for each size and color.",
      ],
    },
    // Add more properties as needed (e.g., imageURL, quantity, etc.)
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Validate uniqueness of size options for each size and color
function sizeOptionsValidator(value) {
  const sizeOptionsMap = new Map();
  for (const sizeOption of value) {
    const key = `${sizeOption.size}-${sizeOption.color}`;
    if (sizeOptionsMap.has(key)) {
      return false;
    }
    sizeOptionsMap.set(key, true);
  }
  return true;
}

// Define a Mongoose pre-save middleware
ProductSchema.pre("save", function (next) {
  if (this.salePrice !== 0) {
    const discountPercentage =
      ((this.price - this.salePrice) / this.price) * 100;
    console.log(discountPercentage);

    if (discountPercentage >= 50) {
      // Set a threshold discount level of 50%
      this.dod = true; // Set the dod flag to true
    }
  }

  next(); // Call the next middleware function
});

ProductSchema.pre("save", function (next) {
  const currentDate = new Date();
  const thresholdDate = new Date();
  thresholdDate.setDate(currentDate.getDate() - 5); // Set the threshold date to 5 days ago

  if (this.createdAt <= thresholdDate) {
    // Check if the product was created more than 5 days ago
    this.newArrival = false; // Turn off the newArrival flag
  }

  next(); // Call the next middleware function
});

module.exports = mongoose.model("Product", ProductSchema);
