import { createSlice } from "@reduxjs/toolkit";
const orderPaySlice = createSlice({
  name: "orderPay",
  initialState: { loading: false, err: null, success: false, order: {} },
  reducers: {
    orderPayRequest(state, action) {
      state.loading = true;
    },
    orderPaySuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.order = action.payload.data;
    },
    orderPayFail(state, action) {
      state.err = action.payload.message;
      state.loading = false;
    },
    orderPayReset(state, action) {
      state.err = null;
      state.loading = false;
      state.success = false;
      state.order = {};
    },
  },
});
export const orderPayAction = orderPaySlice.actions;
export default orderPaySlice.reducer;
