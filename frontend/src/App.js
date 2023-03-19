import data from './data';
import {BrowserRouter, Routes , Route ,Link} from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to="/">eshop</Link>
        </header>
        <main>
          <Routes>
            <Route peth='/product/:token' element={<ProductPage />}/>
            <Route peth='/' element={<HomePage />}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
