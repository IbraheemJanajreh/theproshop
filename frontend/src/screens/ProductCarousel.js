import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listTopProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, err, products } = productTopRated;
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : err ? (
    <Message variant="danger">{err}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ProductCarousel;
