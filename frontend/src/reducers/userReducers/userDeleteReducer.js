import { createSlice } from "@reduxjs/toolkit";
const userDeleteSlice = createSlice({
  name: "userDelete",
  initialState: { loading: false, success: false, err: null },
  reducers: {
    userDeleteRequest(state, action) {
      state.loading = true;
    },
    userDeleteSuccess(state, action) {
      state.loading = false;
      state.success = true;
    },
    userDeleteFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    userDeleteReset(state, action) {
      state.loading = false;
      state.success = false;
      state.err = null;
    },
  },
});
export const userDeleteAction = userDeleteSlice.actions;
export default userDeleteSlice.reducer;
