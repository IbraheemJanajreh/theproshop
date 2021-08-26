import { createSlice } from "@reduxjs/toolkit";
const productTopRatedSlice = createSlice({
  name: "productTopRated",
  initialState: {
    products: [],
    loading: false,
    err: null,
  },
  reducers: {
    productTopRatedRequest(state, action) {
      state.products = [];
      state.loading = true;
    },
    productTopRatedSuccess(state, action) {
      state.products = action.payload.data;
      state.loading = false;
    },
    productTopRatedFail(state, action) {
      state.err = action.payload.message;
      state.loading = false;
    },
  },
});
export const productTopRatedAction = productTopRatedSlice.actions;
export default productTopRatedSlice.reducer;
