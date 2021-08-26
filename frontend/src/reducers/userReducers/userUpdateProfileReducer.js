import { createSlice } from "@reduxjs/toolkit";
const userUpdateProfileSlice = createSlice({
  name: "userUpdateProfile",
  initialState: { loading: false, userInfo: {}, err: null, success: false },
  reducers: {
    userUpdateProfileRequest(state, action) {
      state.loading = true;
      state.success = false;
      state.userInfo = {};
    },
    userUpdateProfileSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.success = true;
    },
    userUpdateProfileFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
      state.success = false;
      state.userInfo = {};
    },
    userUpdateProfileReset(state, action) {
      state.loading = false;
      state.userInfo = {};
      state.err = null;
      state.success = false;
    },
  },
});
export const userUpdateProfileAction = userUpdateProfileSlice.actions;
export default userUpdateProfileSlice.reducer;
