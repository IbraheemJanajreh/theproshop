import { createSlice } from "@reduxjs/toolkit";
const userUpdateSlice = createSlice({
  name: "userUpdate",
  initialState: { loading: false, userInfo: {}, err: null, success: false },
  reducers: {
    userUpdateRequest(state, action) {
      state.loading = true;
      state.success = false;
      state.userInfo = {};
    },
    userUpdateSuccess(state, action) {
      state.loading = false;
      state.userInfo = action.payload.data;
      state.success = true;
    },
    userUpdateFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
      state.success = false;
      state.userInfo = {};
    },
    userUpdateReset(state, action) {
      state.loading = false;
      state.userInfo = {};
      state.err = null;
      state.success = false;
    },
  },
});
export const userUpdateAction = userUpdateSlice.actions;
export default userUpdateSlice.reducer;
