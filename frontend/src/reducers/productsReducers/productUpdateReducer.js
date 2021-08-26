import { createSlice } from "@reduxjs/toolkit";
const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: { loading: false, success: false, err: null},
  reducers: {
    productUpdateRequest(state, action) {
      state.loading = true;
    },
    productUpdateSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    productUpdateFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    productUpdateReset(state, action) {
      state.loading = false;
      state.success = false;
      state.err = null;
    },
  },
});
export const productUpdateAction = productUpdateSlice.actions;
export default productUpdateSlice.reducer;
