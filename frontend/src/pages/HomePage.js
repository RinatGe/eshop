import { useEffect, useReducer } from 'react';
import axios from 'axios';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../Components/Product';
import { Helmet } from'react-helmet-async';
import Loading from '../Components/Loading';
import MessageBox from '../Components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_REQUEST':
      return { ...state, loading: true };
    case 'GET_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'GET_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer((reducer), {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });

      try {
        const res = await axios.get('http://localhost:5000/api/v1/products');
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'GET_FAIL', payload: err.message });
      }
    };

    getProducts();
  }, []);

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h1>Products</h1>
      <div className="products">
        {loading ? (
         <Loading></Loading>
        ) : error ? (
          <MessageBox varient='danger'>{error}</MessageBox>
        ) : (
          <Row>
            
            {products.map((product) => (
              <Col key={product.token} lg={3} md={4} sm={6} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
