import { createSlice } from "@reduxjs/toolkit";
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: { loading: false, user: {}, err: null },
  reducers: {
    userDetailsRequest(state, action) {
      state.loading = true;
    },
    userDetailsSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.data;
    },
    userDetailsFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    userDetailsReset(state, action) {
      state.loading = false;
      state.user = {};
      state.err = null;
    },
  },
});
export const userDetailsAction = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
