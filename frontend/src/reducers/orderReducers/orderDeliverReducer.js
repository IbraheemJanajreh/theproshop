import { createSlice } from "@reduxjs/toolkit";
const orderDeliverSlice = createSlice({
  name: "orderDeliver",
  initialState: { loading: false, err: null, success: false, order: {} },
  reducers: {
    orderDeliverRequest(state, action) {
      state.loading = true;
    },
    orderDeliverSuccess(state, action) {
      state.success = true;
      state.loading = false;
      state.order = action.payload.data;
    },
    orderDeliverFail(state, action) {
      state.err = action.payload.message;
      state.loading = false;
    },
    orderDeliverReset(state, action) {
      state.err = null;
      state.loading = false;
      state.success = false;
      state.order = {};
    },
  },
});
export const orderDeliverAction = orderDeliverSlice.actions;
export default orderDeliverSlice.reducer;
