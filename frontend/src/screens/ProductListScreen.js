import { useEffect, Fragment } from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { useHistory, useParams } from "react-router-dom";
import { productDeleteAction } from "../reducers/productsReducers/productDeleteReducer";
import { productCreateAction } from "../reducers/productsReducers/productCreateReducer";
import { productDetailsAction } from "../reducers/productsReducers/productDetailsReducer";
import Paginate from "../components/Paginate";
const ProductListScreen = () => {
  let { pageNumber } = useParams();
  pageNumber = pageNumber ? pageNumber : 1;
  const history = useHistory();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);
  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    err: errDelete,
  } = productDelete;
  const { userInfo } = userLogin;
  const { loading, err, products, numOfPages, page } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    err: errCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;
  useEffect(() => {
    dispatch(productDetailsAction.productDetailsReset());
    if (successDelete) {
      dispatch(productDeleteAction.productDeleteReset());
    }
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/product/${createdProduct._id}/edit`);
      dispatch(productCreateAction.productCreateReset());
    } else {
      dispatch(listProducts("", pageNumber));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber
  ]);
  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteProduct(id));
    }
  };
  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <Fragment>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus mr-1" />
            Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errDelete && <Message variant="danger">{errDelete}</Message>}
      {loadingCreate && <Loader />}
      {errCreate && <Message variant="danger">{errCreate}</Message>}
      {loading ? (
        <Loader />
      ) : err ? (
        <Message variant="danger">{err}</Message>
      ) : (
        <Fragment>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate numOfPages={numOfPages} page={page} isAdmin={true}/>
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductListScreen;
