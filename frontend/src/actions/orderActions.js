import axios from "axios";
import { orderDeliverAction } from "../reducers/orderReducers/orderDeliverReducer";
import { orderDetailsAction } from "../reducers/orderReducers/orderDetailsReducer";
import { orderListAction } from "../reducers/orderReducers/orderListReducer";
import { orderPayAction } from "../reducers/orderReducers/orderPayReducer";
import { orderCreateAction } from "../reducers/orderReducers/orderCreateReducer";
import { ordersUserAction } from "../reducers/orderReducers/ordersUserReducer";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderCreateAction.orderRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);
    dispatch(
      orderCreateAction.orderSuccess({
        data,
      })
    );
  } catch (err) {
    dispatch(
      orderCreateAction.orderFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderDetailsAction.orderDetailsRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch(
      orderDetailsAction.orderDetailsSuccess({
        data,
      })
    );
  } catch (err) {
    dispatch(
      orderDetailsAction.orderDetailsFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderPayAction.orderPayRequest());

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
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );
      dispatch(orderPayAction.orderPaySuccess({ data }));
    } catch (err) {
      dispatch(
        orderPayAction.orderPayFail({
          message:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        })
      );
    }
  };

export const listUserOrders = () => async (dispatch, getState) => {
  try {
    dispatch(ordersUserAction.userOrdersRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);
    dispatch(ordersUserAction.userOrdersSuccess({ data }));
  } catch (err) {
    dispatch(
      ordersUserAction.userOrdersFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderListAction.orderListRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);
    dispatch(
      orderListAction.orderListSuccess({
        data,
      })
    );
  } catch (err) {
    dispatch(
      orderListAction.orderListFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderDeliverAction.orderDeliverRequest());

    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );
    dispatch(orderDeliverAction.orderDeliverSuccess({ data }));
  } catch (err) {
    dispatch(
      orderDeliverAction.orderDeliverFail({
        message:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    );
  }
};
