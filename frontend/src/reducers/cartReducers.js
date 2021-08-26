import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
  reducers: {
    addCartItem(state, action) {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
    },
    removeCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (x) => x.product !== action.payload.id
      );
    },
    resetCart(state, action) {
      state.cartItems = [];
      state.shippingAddress = {};
      state.paymentMethod = "";
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload.data;
    },
    savePaymentMethod(state, action) {
      state.paymentMethod = action.payload.data;
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
