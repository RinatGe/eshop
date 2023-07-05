//import './App.css';//Rinats proj
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import ProductPage from './pages/ProductPage.js';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import { Store } from './Store';
import CartPage from './pages/CartPage.js';
import SigninPage from './pages/SigninPage.js';
import SignupPage from './pages/SignupPage.js';
import ShippingAddressPage from './pages/ShippingAddressPage.js';
import PaymentPage from './pages/PaymentPage.js';
import Header from './Components/Header.js';
import {ToastContainer} from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const { state } = useContext(Store);
  const { cart } = state;


  
 

  return (
    <BrowserRouter>
      <div className="d-flex flex-column side-allpage">
        <ToastContainer position='bottom-center'limit={1}/>
        <Header cart={cart} />

        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/signin" element={<SigninPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/product/:token" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/payment" element={<PaymentPage />}/>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">all rights reserved</div>
        </footer>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
