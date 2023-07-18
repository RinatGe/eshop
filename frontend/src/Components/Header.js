import React, { useContext  } from 'react';
import Container from 'react-bootstrap/Container';
import axios from 'axios';
import { Link,useNavigate ,useLocation} from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import { LinkContainer } from 'react-router-bootstrap';
import NavBar from 'react-bootstrap/Navbar';

import { Store } from '../Store.js';
import NavDropdown from 'react-bootstrap/NavDropdown';




function Header({ cart }) {

  const navigate = useNavigate();//you can pass an obj inside to.
  const location = useLocation();//allows us to get information about the current route.

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {cart: { cartItems },userInfo} = state;

  const addToCartHandler = async (product, cartItems, ctxDispatch) => {
    const existedItem = cartItems.find((x) => x._id === product._id);
    const quantity = existedItem ? existedItem.quantity + 1 : 1;

    try {
      const { data } = await axios.get(`/api/v1/products/${product._id}`);

      if (data.countInStock < quantity) {
        window.alert('Sorry, Product is out of stock');
        return;
      }

      ctxDispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    } catch (err) {
      ctxDispatch({ type: 'GET_FAIL', payload: err.message });
    }
  };

  //Cancels out default behaviour when the mouse is on the cart-icon
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  //When item card is dragged to the icon, it add it to the cart (provided it is in-stock).
  const handleDrop = async (event) => {
    event.preventDefault();

    //Gets the item-id from the dragged item.
    const productId = event.dataTransfer.getData('text/plain');

    const { data } = await axios.get(`/api/v1/products/${productId}`);

    await addToCartHandler(data, cartItems, ctxDispatch);
  };

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <div>
      <header className="header">
        <NavBar bg="dark" variant="dark">
          <Link onClick={()=> navigate(-1)} >
          {location.pathname !== '/' && <i>Back</i>}{/* if the location path isNOT home then it will show the link */}
          </Link>
          <Container>
            <LinkContainer to="/">
              <NavBar.Brand>Eshop</NavBar.Brand>
            </LinkContainer>
            <nav
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="d-flex mx-auto align-items-center"
            >
              <Link to="/cart" className="nav-link">
                <i className="fas fa-shopping-cart text-white"></i>
                {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </Badge>
                )}
              </Link>
            </nav>

            {userInfo ? (
              <NavDropdown
                className="text-white"
                title={userInfo.name}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/profile">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/orderhistory">
                  <NavDropdown.Item>Order History</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
                
                
                <Link
                  onClick={signoutHandler}
                  to="#signout"
                  className="dropdown-item">
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link text-white" to="/signin">
                Sign In
              </Link>
            )}
          </Container>
        </NavBar>
      </header>
    </div>
  );
}
export default Header;
