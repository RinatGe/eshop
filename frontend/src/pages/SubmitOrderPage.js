import React, { useContext, useEffect ,useReducer} from 'react';
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../Components/shared/CheckoutSteps';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import { Link, useNavigate} from 'react-router-dom';
import Loading from '../Components/shared/Loading';
import Button from 'react-bootstrap/Button';
import {toast} from 'react-toastify';
import { getError } from '../Utils';
import axios from 'axios';

const SubmitOrderPage = () => {

//useState--for managing one state/value at a time.
//useReducer--for managing multipale values /collection of values at a time.
//so i dont have to have many diffrent states and change them individually

const reducer = (state, action) => {
  switch(action.type){
    case 'CREATE_REQUEST':
      return {...state,loading : true };

      case 'CREATE_SUCCEDED':
        return {...state,loading:false};

        case 'CREATE_FAILED':
          return {...state,loading:false};



          default:
            return state;
  }
};

const [{ loading},dispatch] = useReducer(reducer,{
  loading:false,
  

});




  const {state ,dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo} = state;
  const {paymentMethod} = cart;
const navigate = useNavigate();
//const location = useLocation();//allows us to get information about the current route.

const submitOrderHandler = async () => {     //in here we are writting trycatch with DISPATCH to inform REACT(all over the app not just locali in this page)
try {
  dispatch({type:'CREATE_REQUEST'});          //informing the dispatch 
 
  //talking to server-sending him data want to save-so i make post with axios
//data--property of POST
  const {data} = await axios.post('/api/v1/orders',{
    //object sending to server:
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    paymentMethod: cart.paymentMethod,
    itemsPrice: cart.itemsPrice,
    taxPrice:cart.taxPrice,
    shippingPrice:cart.shippingPrice,
    totalPrice:cart.totalPrice 
    
  },{
    headers:{authorization: `Bearer ${userInfo.token}`}
  })

  dispatch({type: 'CREATE_SUCCEDED'});
  ctxDispatch({type: 'CLEAR_CART'});    //after sending to server i want to update my cart so it wil be empty-my cart is 
  localStorage.removeItem('cartItems'); //global state-i update GLOBAL state with ctxDispatch.

  navigate(`/order/${data.order._id}`);                 



} catch (err) {
  dispatch({type:'CREATE_FAILED'});
  toast.error(getError(err.message));
}
  }

const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

// //allItemsToghtherPrice==Collection
 cart.itemsPrice = round2(cart.cartItems.reduce((a,c)=> a + c.price * c.quantity,0)); //i want to know total price of all items in my cart reduce=acomulision,sum up
 cart.taxPrice = round2(cart.itemsPrice * 0.17);
cart.shippingPrice = cart.itemsPrice > 50 ? round2(cart.shippingPrice === 0) : round2(cart.itemsPrice * 0.1 );
cart.totalPrice = (cart.itemsPrice + cart.shippingPrice + cart.taxPrice);





  useEffect(()=>{
if(!paymentMethod){
  navigate('/payment');
}

  },[navigate,paymentMethod])



  return (
    <div>
    <Helmet>
   <title className="my-3">Order Sumemry</title>
</Helmet>
<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
<h1 className="my-3">Orders Summery</h1>
<Row>
  <Col md={8}>
  <Card className="mb-3">
    
    <Card.Body>
      <Card.Title>Shipping</Card.Title>
      <Card.Text>
         <strong>Name: </strong>
        {cart.shippingAddress.fullName}
        <br />
        <strong>Adress: </strong>
        {cart.shippingAddress.address}
        <br />
        <strong>City: </strong>
        {cart.shippingAddress.city}
        <br />
        <strong>Country: </strong>
        {cart.shippingAddress.country}
        <br /> 
      </Card.Text>
      </Card.Body>
  </Card>

  <Card className="mb-3">
    <Card.Body>
      <Card.Title>Payment</Card.Title>
      <Card.Text>
        <strong>Method: </strong>
        {cart.paymentMethod}
      </Card.Text>
      <Link to='/payment'>Edit</Link>
    </Card.Body>
  </Card>

  <Card className="mb=3">
    <Card.Body>
      <Card.Title>Items: </Card.Title>
      <ListGroup variant="flush">
        {cart.cartItems.map((item) => (
          <ListGroup.Item key={item._id}>
            <Row className="align-item-center">
              <Col md={6}>
                <img src={item.image} alt={item.name}
                className="img-fluid rounded img-thumbnail"></img>
                {' '}
                <Link to={`/product/${item.token}`}> {item.name}</Link>
              </Col>
              <Col md={3}>
              <span>quantity: {item.quantity}</span>
              </Col>
              <Col md={3}>
              price: ${item.price}
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
        </ListGroup>
        <Link to='/cart'>Back to cart</Link>
    </Card.Body>
  </Card>
  </Col>


<Col md={4}>
<Card>
            <Card.Body>
              <Card.Title> Summery</Card.Title>
              <ListGroup variant="flush">

                <ListGroup.Item>
                  <Row>
                    <Col>Items: </Col>
                    <Col>${cart.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping: </Col>
                      <Col>${cart.shippingPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax: </Col>
                      <Col>
                        <strong>${cart.taxPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total: </Col>
                      <Col>
                      <strong>${cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        type="button"
                         onClick={submitOrderHandler()}
                        disabled={cart.cartItems.length === 0}
                      >Submit</Button>
                    </div>
                    <div>
                       {loading && <Loading></Loading>} 
                    </div>
                  </ListGroup.Item>
                </ListGroup>
            </Card.Body>
          </Card>
       </Col>
     </Row>
   </div>

  )

}

export default SubmitOrderPage;