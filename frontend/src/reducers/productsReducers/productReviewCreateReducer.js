import { createSlice } from "@reduxjs/toolkit";
const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: { loading: false, success: false, err: null },
  reducers: {
    productReviewCreateRequest(state, action) {
      state.loading = true;
    },
    productReviewCreateSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    productReviewCreateeFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    productReviewCreateReset(state, action) {
      state.loading = false;
      state.success = false;
      state.err = null;
    },
  },
});
export const productReviewCreateAction = productReviewCreateSlice.actions;
export default productReviewCreateSlice.reducer;
