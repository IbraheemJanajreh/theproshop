import { createSlice } from "@reduxjs/toolkit";
const orderCreateSlice = createSlice({
  name: "orderCreate",
  initialState: { loading: false, success: false, err: null, order: {} },
  reducers: {
    orderRequest(state, action) {
      state.loading = true;
    },
    orderSuccess(state, action) {
      state.loading = false;
      state.success = true;
      state.order = action.payload.data;
    },
    orderFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    orderReset(state, action) {
      state.loading = false;
      state.err = null;
      state.success = false;
      state.order = {};
    },
  },
});

export const orderCreateAction = orderCreateSlice.actions;
export default orderCreateSlice.reducer;
