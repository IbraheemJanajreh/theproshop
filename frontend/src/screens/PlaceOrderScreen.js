import { Fragment, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useHistory } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { userDetailsAction } from "../reducers/userReducers/userDetailsReducer";
import { orderCreateAction } from "../reducers/orderReducers/orderCreateReducer";
const PlaceOrderScreen = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const cart = useSelector((state) => state.cart);
  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }
  const itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 100);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = addDecimals(
    Number(shippingPrice) + Number(itemsPrice) + Number(taxPrice)
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, err } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch(userDetailsAction.userDetailsReset());
      dispatch(orderCreateAction.orderReset());
    }
    // eslint-disable-next-line
  }, [success, history]);
  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
  };
  return (
    <Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {err && <Message variant="danger">{err}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default PlaceOrderScreen;
