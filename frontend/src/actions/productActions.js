import axios from "axios";
import { productCreateAction } from "../reducers/productsReducers/productCreateReducer";
import { productDeleteAction } from "../reducers/productsReducers/productDeleteReducer";
import { productDetailsAction } from "../reducers/productsReducers/productDetailsReducer";
import { productListAction } from "../reducers/productsReducers/productListReducer";
import { productReviewCreateAction } from "../reducers/productsReducers/productReviewCreateReducer";
import { productUpdateAction } from "../reducers/productsReducers/productUpdateReducer";
import { productTopRatedAction } from "../reducers/productsReducers/productTopRatedReducer";
import { logout } from "./userActions";
export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch(productListAction.productListRequest());
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch(productListAction.productListSuccess(data));
    } catch (err) {
      dispatch(
        productListAction.productListFail({
          message:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        })
      );
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailsAction.productDetailsRequest());
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch(productDetailsAction.productDetailsSuccess({ product: data }));
  } catch (err) {
    dispatch(
      productDetailsAction.productDetailsFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productDeleteAction.productDeleteRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch(productDeleteAction.productDeleteSuccess());
  } catch (err) {
    dispatch(
      productDeleteAction.productDeleteFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productCreateAction.productCreateRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch(productCreateAction.productCreateSuccess({ data }));
  } catch (err) {
    dispatch(
      productCreateAction.productCreateFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productUpdateAction.productUpdateRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch(productUpdateAction.productUpdateSuccess());
    dispatch(productDetailsAction.productDetailsSuccess(data));
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch(
      productUpdateAction.productUpdateFail({
        message,
      })
    );
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productReviewCreateAction.productReviewCreateRequest());

      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`/api/products/${productId}/reviews`, review, config);
      dispatch(productReviewCreateAction.productReviewCreateSuccess());
    } catch (err) {
      dispatch(
        productReviewCreateAction.productReviewCreateeFail({
          message:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        })
      );
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productTopRatedAction.productTopRatedRequest());
    const { data } = await axios.get(`/api/products/top`);
    dispatch(productTopRatedAction.productTopRatedSuccess({ data }));
  } catch (err) {
    dispatch(
      productTopRatedAction.productTopRatedFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};
