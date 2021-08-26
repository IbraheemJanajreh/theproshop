import { createSlice } from "@reduxjs/toolkit";
const orderListSlice = createSlice({
  name: "orderList",
  initialState: { loading: false, orders: [], err: null },
  reducers: {
    orderListRequest(state, action) {
      state.loading = true;
    },
    orderListSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.data;
    },
    orderListFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    orderListReset(state, action) {
      state.loading = false;
      state.err = false;
      state.orders = [];
    },
  },
});
export const orderListAction = orderListSlice.actions;
export default orderListSlice.reducer;
