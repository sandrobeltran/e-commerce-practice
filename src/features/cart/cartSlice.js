import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    amount: 0,
    products: [],
  },
  reducers: {
    setCart: (state, action) => {
      return (state = action.payload);
    },
    addProductToCart: (state, { payload: { product, cantity } }) => {
      state.amount = state.amount + cantity;
      if (state.products.find((item) => item.title == product.title)) {
        const index = state.products.findIndex((item) => item.title == product.title)
        state.products[index].cantity = state.products[index].cantity + cantity
      } else {
        state.products.push({
          _id: product._id,
          title: product.title,
          price: product.price,
          image: product.image,
          cantity: cantity,
        });
      }
    },
  },
});

export const { setCart, addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
