import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Rating from '../Components/shared/Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { Helmet } from 'react-helmet-async';
import Loading from '../Components/shared/Loading';
import MessageBox from '../Components/shared/MessageBox';
import { getError, addToCartHandler } from '../Utils';
import { productPageReducer } from '../reducers/productPageReducer';
import { Store } from '../Store';

function ProductPage() {
  const params = useParams(); //hook that returns an object of key value pairs
  const { token } = params; //deconstruction of the object to just the "key" part-token
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const initialState = {
    loading: true,
    error: '',
    product: [],
  };

  const [{ loading, error, product }, dispatch] = useReducer(
    productPageReducer,
    initialState
  );

  const addToCart = async () => {
    await addToCartHandler(product, cartItems, ctxDispatch);
    navigate('/cart');
  };
  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: 'GET_REQUEST' });

      try {
        const res = await axios.get(`/api/v1/products/token/${token}`); //from line 29
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: getError(err) });
      }

      //setProducts(res.data);
    };

    getProduct();
  }, [token]); //each time the token is changing-the useEffect method renders all over again

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <img
                className="img-large"
                src={`../${product.image}`}
                alt={product.name}
              />
            </Col>

            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <Helmet>
                    <title>{product.name}</title>
                  </Helmet>
                  <h1>{product.name}</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: <p className="lead">{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>${product.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {product.countInStock > 0 ? (
                            <Badge bg="success">In Stock</Badge>
                          ) : (
                            <Badge bg="danger">Not in Stock</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <div className="d-grid">
                          <Button onClick={() => addToCart()} variant="primary">
                            Add to cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
