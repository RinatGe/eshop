//like daniels' asaf prefers folder of utiles and each one has its on file...
//import { ADD_TO_CART, GET_FAIL, axios } from './Imports';

import axios from 'axios';



export const getError = (error) => {
    return (
        error.message && error.response.data.message ?
            error.response.data.message : error.response
    );
};



export const addToCartHandler = async (product , cartItems, ctxDispatch) => {

    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    try {
    const { data } = await axios.get(`/api/v1/products/${product._id}`);

    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
  } catch (err){
    ctxDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    
  }
  };