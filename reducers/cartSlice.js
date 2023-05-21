const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { product, count } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => {
        if (item.product && item.product._id && product && product._id) {
          if (item.product._id === product._id) {
            return item.product._id === product._id;
          }
        }
        return false;
      });
      if (itemIndex >= 0) {
        state.cartItems[itemIndex] = {
          ...state.cartItems[itemIndex],
          cartQuantity: state.cartItems[itemIndex].cartQuantity + count,
        };
      } else {
        state.cartItems.push({
          product,
          cartQuantity: count,
        });
      }
      // Update cart total quantity
      state.cartTotalQuantity = state.cartItems.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );
      // Update cart total amount
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) =>
          total +
          (item.product.salePrice || item.product.price) * item.cartQuantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    atc(state, action) {
      state.cartItems = action.payload;
      // Update cart total quantity
      state.cartTotalQuantity = state.cartItems.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );
      // Update cart total amount
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) =>
          total +
          (item.product.salePrice || item.product.price) * item.cartQuantity,
        0
      );
    },
    patc(state, action) {
      const { product, count } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => {
        if (item.product && item.product._id && product && product._id) {
          if (item.product._id === product._id) {
            if (product.sizeOptions && product.sizeOptions.length > 0) {
              return item.product.sizeOptions === product.sizeOptions;
            } else {
              return true;
            }
          }
        }
        return false;
      });
      if (itemIndex >= 0) {
        state.cartItems[itemIndex] = {
          ...state.cartItems[itemIndex],
          cartQuantity: state.cartItems[itemIndex].cartQuantity + count,
        };
      } else {
        state.cartItems.push({
          product,
          cartQuantity: count,
        });
      }
      // Update cart total quantity
      state.cartTotalQuantity = state.cartItems.reduce(
        (total, item) => total + item.cartQuantity,
        0
      );
      // Update cart total amount
      state.cartTotalAmount = state.cartItems.reduce(
        (total, item) =>
          total +
          (item.product.salePrice || item.product.price) * item.cartQuantity,
        0
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity(state, action) {
      const { _id, sizeOptions } = action.payload;
      const productId = _id;
      const itemIndex = state.cartItems.findIndex((item) =>
        item.product._id === productId && item.product.sizeOptions.length !== 0
          ? item.product.sizeOptions === sizeOptions
          : true
      );

      if (itemIndex >= 0) {
        if (state.cartItems[itemIndex].cartQuantity === 1) {
          // Remove the item from cart if the quantity becomes zero
          state.cartItems.splice(itemIndex, 1);
        } else {
          // Decrease the cartQuantity by 1
          state.cartItems[itemIndex].cartQuantity -= 1;
        }
        // Update cart total quantity
        state.cartTotalQuantity = state.cartItems.reduce(
          (total, item) => total + item.cartQuantity,
          0
        );
        // Update cart total amount
        state.cartTotalAmount = state.cartItems.reduce(
          (total, item) =>
            total +
            (item.product.salePrice || item.product.price) * item.cartQuantity,
          0
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    increaseCartQuantity(state, action) {
      const { _id, sizeOptions } = action.payload;
      const productId = _id;
      const itemIndex = state.cartItems.findIndex((item) =>
        item.product._id === productId && item.product.sizeOptions.length !== 0
          ? item.product.sizeOptions === sizeOptions
          : true
      );

      if (itemIndex >= 0) {
        // Increase the cartQuantity by 1
        state.cartItems[itemIndex].cartQuantity += 1;
        // Update cart total quantity
        state.cartTotalQuantity = state.cartItems.reduce(
          (total, item) => total + item.cartQuantity,
          0
        );
        // Update cart total amount
        state.cartTotalAmount = state.cartItems.reduce(
          (total, item) =>
            total +
            (item.product.salePrice || item.product.price) * item.cartQuantity,
          0
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },

    removeCartItem(state, action) {
      const { _id } = action.payload;
      const productId = _id;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product._id === productId
      );

      if (itemIndex >= 0) {
        // Remove the item from cart
        state.cartItems.splice(itemIndex, 1);

        // Update cart total quantity
        state.cartTotalQuantity = state.cartItems.reduce(
          (total, item) => total + item.cartQuantity,
          0
        );
        // Update cart total amount
        state.cartTotalAmount = state.cartItems.reduce(
          (total, item) =>
            total +
            (item.product.salePrice || item.product.price) * item.cartQuantity,
          0
        );
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  atc,
  patc,
  decreaseCartQuantity,
  increaseCartQuantity,
  removeCartItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
