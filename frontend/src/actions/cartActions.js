import axios from "axios";
import { cartAction } from "../reducers/cartReducers";
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch(
    cartAction.addCartItem({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(
    cartAction.removeCartItem({
      id,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(
    cartAction.saveShippingAddress({
      data,
    })
  );
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(
    cartAction.savePaymentMethod({
      data,
    })
  );
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
