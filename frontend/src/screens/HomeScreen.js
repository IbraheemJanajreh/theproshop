import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousel from "./ProductCarousel";
import Meta from "../components/Meta";
const HomeScreen = () => {
  let { keyword, pageNumber } = useParams();
  pageNumber = pageNumber ? pageNumber : 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, err, products, numOfPages, page } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <Fragment>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : err ? (
        <Message variant="danger">{err}</Message>
      ) : (
        <Fragment>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate numOfPages={numOfPages} page={page} keyword={keyword} />
        </Fragment>
      )}
    </Fragment>
  );
};
export default HomeScreen;
