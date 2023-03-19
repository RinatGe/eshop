import data from '../data';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>products</h1>
      <div className="products">
        {data.products.map((product) => (
          <div key={product.token} className="product">
            <Link to={`/product/${product.token}`}>
              <img alt={product.name} src={product.image}></img>
            </Link>
            <div>
              <Link to={`/product/${product.token}`}></Link>
              <p>{product.name}</p>
              <p>{product.price}$</p>
              <button>ADD TO CURT</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
