import axios from "axios";
import { cartAction } from "../reducers/cartReducers";
import { ordersUserAction } from "../reducers/orderReducers/ordersUserReducer";
import { userDeleteAction } from "../reducers/userReducers/userDeleteReducer";
import { userDetailsAction } from "../reducers/userReducers/userDetailsReducer";
import { userListAction } from "../reducers/userReducers/userListReducer";
import { userLoginAction } from "../reducers/userReducers/userLoginReducers";
import { userRegisterAction } from "../reducers/userReducers/userRegisterReducers";
import { userUpdateProfileAction } from "../reducers/userReducers/userUpdateProfileReducer";
import { userUpdateAction } from "../reducers/userReducers/userUpdateReducer";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(userLoginAction.loginRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users/login",
      { email, password },
      config
    );
    dispatch(
      userLoginAction.loginSuccess({
        data,
      })
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(
      userLoginAction.loginFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(userLoginAction.logout());
  dispatch(userDetailsAction.userDetailsReset());
  dispatch(ordersUserAction.userOrderReset());
  dispatch(userListAction.userListReset());
  dispatch(userRegisterAction.registerReset());
  dispatch(cartAction.resetCart());
  localStorage.removeItem("cartItems");
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(userRegisterAction.registerRequest());
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "api/users",
      { name, email, password },
      config
    );
    dispatch(
      userRegisterAction.registerSuccess({
        data,
      })
    );
    dispatch(
      userLoginAction.loginSuccess({
        data,
      })
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(
      userRegisterAction.registerFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDetailsAction.userDetailsRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch(
      userDetailsAction.userDetailsSuccess({
        data,
      })
    );
  } catch (err) {
    dispatch(
      userDetailsAction.userDetailsFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateProfileAction.userUpdateProfileRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`api/users/profile`, user, config);
    dispatch(
      userUpdateProfileAction.userUpdateProfileSuccess({
        data,
      })
    );
    dispatch(
      userLoginAction.loginSuccess({
        data,
      })
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch(
      userUpdateProfileAction.userUpdateProfileFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userListAction.userListRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch(
      userListAction.userListSuccess({
        data,
      })
    );
  } catch (err) {
    dispatch(
      userListAction.userListFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userDeleteAction.userDeleteRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch(userDeleteAction.userDeleteSuccess());
  } catch (err) {
    dispatch(
      userDeleteAction.userDeleteFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userUpdateAction.userUpdateReset());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    dispatch(userUpdateAction.userUpdateSuccess({ data }));
    dispatch(userDetailsAction.userDetailsSuccess({ data }));
    dispatch(userDetailsAction.userDetailsReset());
  } catch (err) {
    dispatch(
      userUpdateAction.userUpdateFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};
