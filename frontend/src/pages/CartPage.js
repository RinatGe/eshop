import { useContext } from 'react';
import { Store } from '..Store.js';
import { Helmet } from 'react-helmet-async';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import {Button} from 'react-bootstrap';

function CartPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);


  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              tour cart is empty
              <div>
                <Link to="/cart">to home</Link>
              </div>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                        <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>{''}
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col>
                    <Button variant="light" disabeld={item.quantity === 1}>
                        <i className="fas fa-plus-circle"></i>
                    </Button>{''}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}

export default CartPage;
