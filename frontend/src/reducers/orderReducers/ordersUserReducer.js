import { createSlice } from "@reduxjs/toolkit";
const ordersUserSlice = createSlice({
  name: "OrdersUser",
  initialState: { loading: false, err: null, orders: [] },
  reducers: {
    userOrdersRequest(state, action) {
      state.loading = true;
    },
    userOrdersSuccess(state, action) {
      state.loading = false;
      state.orders = action.payload.data;
    },
    userOrdersFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    userOrderReset(state, action) {
      state.orders = [];
      state.loading = false;
      state.err = null;
    },
  },
});

export const ordersUserAction = ordersUserSlice.actions;
export default ordersUserSlice.reducer;
