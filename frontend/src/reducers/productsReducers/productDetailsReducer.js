import { createSlice } from "@reduxjs/toolkit";
const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: { product: { reviews: [] }, loading: false, err: null },
  reducers: {
    productDetailsRequest(state, action) {
      state.loading = true;
    },
    productDetailsSuccess(state, action) {
      state.product = action.payload.product;
      state.loading = false;
    },
    productDetailsFail(state, action) {
      state.err = action.payload.message;
      state.loading = false;
    },
    productDetailsReset(state, action) {
      state.product = { reviews: [] };
      state.loading = false;
      state.err = null;
    },
  },
});
export const productDetailsAction = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
