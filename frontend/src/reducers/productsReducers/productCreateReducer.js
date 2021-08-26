import { createSlice } from "@reduxjs/toolkit";
const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: { loading: false, success: false, err: null, product: {} },
  reducers: {
    productCreateRequest(state, action) {
      state.loading = true;
    },
    productCreateSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.product = action.payload.data;
    },
    productCreateFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    productCreateReset(state, action) {
      state.loading = false;
      state.success = false;
      state.err = null;
      state.product = {};
    },
  },
});
export const productCreateAction = productCreateSlice.actions;
export default productCreateSlice.reducer;
