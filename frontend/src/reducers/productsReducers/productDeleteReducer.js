import { createSlice } from "@reduxjs/toolkit";
const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: { loading: false, success: false, err: null },
  reducers: {
    productDeleteRequest(state, action) {
      state.loading = true;
    },
    productDeleteSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    productDeleteFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    productDeleteReset(state, action) {
      state.loading = false;
      state.success = false;
      state.err = null;
    },
  },
});
export const productDeleteAction = productDeleteSlice.actions;
export default productDeleteSlice.reducer;
