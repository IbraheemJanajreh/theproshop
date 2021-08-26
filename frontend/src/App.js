import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
const App = () => {
  return (
    <Router>
      <Header className="py-3"></Header>
      <main>
        <Container>
          <Route path="/orders/:id">
            <OrderScreen />
          </Route>
          <Route path="/product/:id">
            <ProductScreen />
          </Route>
          <Route path="/cart/:id?">
            <CartScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route path="/profile">
            <ProfileScreen />
          </Route>
          <Route path="/shipping">
            <ShippingScreen />
          </Route>
          <Route path="/payment">
            <PaymentScreen />
          </Route>
          <Route path="/placeorder">
            <PlaceOrderScreen />
          </Route>
          <Route path="/admin/userlist">
            <UserListScreen />
          </Route>
          <Route path="/admin/user/:id/edit">
            <UserEditScreen />
          </Route>
          <Route path="/admin/productlist" exact>
            <ProductListScreen />
          </Route>
          <Route path="/admin/productlist/:pageNumber" exact>
            <ProductListScreen />
          </Route>
          <Route path="/admin/product/:id/edit">
            <ProductEditScreen />
          </Route>
          <Route path="/admin/orderlist">
            <OrderListScreen />
          </Route>
          <Route path="/search/:keyword" exact>
            <HomeScreen />
          </Route>
          <Route path="/page/:pageNumber">
            <HomeScreen />
          </Route>
          <Route path="/search/:keyword/page/:pageNumber" exact>
            <HomeScreen />
          </Route>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};
export default App;
