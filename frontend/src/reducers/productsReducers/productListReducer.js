import { createSlice } from "@reduxjs/toolkit";
const productListSlice = createSlice({
  name: "productList",
  initialState: {
    products: [],
    loading: false,
    err: null,
    numOfPages: null,
    page: null,
  },
  reducers: {
    productListRequest(state, action) {
      state.products = [];
      state.loading = true;
    },
    productListSuccess(state, action) {
      state.products = action.payload.products;
      state.numOfPages = action.payload.numOfPages;
      state.page = action.payload.page;
      state.loading = false;
    },
    productListFail(state, action) {
      state.err = action.payload.message;
      state.loading = false;
    },
  },
});
export const productListAction = productListSlice.actions;
export default productListSlice.reducer;
