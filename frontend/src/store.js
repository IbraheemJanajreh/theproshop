import { configureStore } from "@reduxjs/toolkit";
import productListReducer from "./reducers/productsReducers/productListReducer";
import productDetailsReducer from "./reducers/productsReducers/productDetailsReducer";
import productDeleteReducer from "./reducers/productsReducers/productDeleteReducer";
import cartReducers from "./reducers/cartReducers";
import userLoginReducers from "./reducers/userReducers/userLoginReducers";
import userRegisterReducers from "./reducers/userReducers/userRegisterReducers";
import userDetailsReducer from "./reducers/userReducers/userDetailsReducer";
import userUpdateProfileReducer from "./reducers/userReducers/userUpdateProfileReducer";
import orderCreateReducers from "./reducers/orderReducers/orderCreateReducer";
import orderDetailsReducer from "./reducers/orderReducers/orderDetailsReducer";
import orderPayReducer from "./reducers/orderReducers/orderPayReducer";
import ordersUserReducer from "./reducers/orderReducers/ordersUserReducer";
import userListReducer from "./reducers/userReducers/userListReducer";
import userDeleteReducer from "./reducers/userReducers/userDeleteReducer";
import userUpdateReducer from "./reducers/userReducers/userUpdateReducer";
import productCreateReducer from "./reducers/productsReducers/productCreateReducer";
import productUpdateReducer from "./reducers/productsReducers/productUpdateReducer";
import orderListReducer from "./reducers/orderReducers/orderListReducer";
import orderDeliverReducer from "./reducers/orderReducers/orderDeliverReducer";
import productTopRatedReducer from "./reducers/productsReducers/productTopRatedReducer";
import productReviewCreateReducer from "./reducers/productsReducers/productReviewCreateReducer";
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};
const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducers,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    ordersUser: ordersUserReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
  },
  preloadedState: initialState,
});

export default store;
