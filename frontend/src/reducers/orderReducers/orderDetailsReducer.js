import { createSlice } from "@reduxjs/toolkit";
const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState: {
    loading: true,
    err: null,
    order: {},
  },
  reducers: {
    orderDetailsRequest(state, action) {
      state.loading = true;
    },
    orderDetailsSuccess(state, action) {
      state.loading = false;
      state.order = action.payload.data;
    },
    orderDetailsFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
  },
});

export const orderDetailsAction = orderDetailsSlice.actions;
export default orderDetailsSlice.reducer;
