import { createSlice } from "@reduxjs/toolkit";
const userRegisterSlice = createSlice({
  name: "userRegister",
  initialState: { loading: false, userInfo: null, err: null },
  reducers: {
    registerRequest(state, action) {
      state.loading = true;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.data;
    },
    registerFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    registerReset(state, action) {
      state.loading = false;
      state.userInfo = null;
      state.err = null;
    },
  },
});
export const userRegisterAction = userRegisterSlice.actions;
export default userRegisterSlice.reducer;
