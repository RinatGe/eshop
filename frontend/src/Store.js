import { createContext } from 'react';
import { useReducer } from 'react';

export const Store = createContext(); //const for the "collection" of states we will pass --for using
// context hook,instad of using props.global states for every page


//initial state--->if i will refresh the page it will display
// with saved actions and changes-if browser closes
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
      
      shippingAddress: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) 
      : {}
  },
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log(action);
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'REMOVE_FROM_CART': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'USER_SIGNIN': {
      return { ...state, userInfo:action.payload}
    }

    case 'USER_SIGNOUT': {
      return { ...state, userInfo:null , cart:{cartItems: [] ,shippingAddress: {}}};
    }

    case 'SAVE_SHIPPING_ADDRESS' : {
      return { ...state,cart: {...state.cart,shippingAddress: action.payload}};
    }

  

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}> {props.children} </Store.Provider>;
}
