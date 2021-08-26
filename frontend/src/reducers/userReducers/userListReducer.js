import { createSlice } from "@reduxjs/toolkit";
const userListSlice = createSlice({
  name: "userList",
  initialState: { loading: false, users: [], err: null },
  reducers: {
    userListRequest(state, action) {
      state.loading = true;
    },
    userListSuccess(state, action) {
      state.loading = false;
      state.users = action.payload.data;
    },
    userListFail(state, action) {
      state.loading = false;
      state.err = action.payload.message;
    },
    userListReset(state, action) {
      state.loading = false;
      state.err = false;
      state.users = [];
    },
  },
});
export const userListAction = userListSlice.actions;
export default userListSlice.reducer;
