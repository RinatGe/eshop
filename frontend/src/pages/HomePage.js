import data from '../data';
import { Link } from 'react-router-dom';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';

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
  const [{ loading, error, products }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    products: [],
  });

  //product--> get
  //setProduct-->set

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: 'GET_REQUEST' });
      try {
        const res = await axios.get('/api/v1/products'); // try catch needed to be added
        dispatch({ type: 'GET_SUCCESS', payload: res.data });
      } catch (error) {
        dispatch({ type: 'GET_FAIL', payload: error.message });
      }
    };
    getProducts();
  }, []);

  return (
    <div>
      <h1>products</h1>
      <div className="products">
        {loading ? (<p>loading...</p>) 

        : 
        error ? (<p>{error}</p>) 
        : 

        ( products.map((product) => (
            <div key={product.token} className="product">
              <Link to={`/product/${product.token}`}>
                <img alt={product.name} src={product.image}></img>
              </Link>
              <div>
                <Link to={`/product/${product.token}`}></Link>
                <strong>
                  <p>{product.name}</p>
                </strong>
                <p>{product.price}$</p>
                <button>ADD TO CURT</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
