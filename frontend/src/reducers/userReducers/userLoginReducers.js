import { createSlice } from "@reduxjs/toolkit";
const userLoginSlice = createSlice({
  name: "userLogin",
  initialState: { loading: false, userInfo: null, err: null },
  reducers: {
    loginRequest(state, action) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.data;
    },
    loginFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    logout(state, action) {
      state.err = null;
      state.loading = false;
      state.userInfo = null;
    },
  },
});
export const userLoginAction = userLoginSlice.actions;
export default userLoginSlice.reducer;
