import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';


function Product(props) {
  const { product } = props;
  return (
 
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.token}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>{product.price}$</Card.Text>
        <Button className="btn-primary">Add to Cart</Button>
      </Card.Body>
    </Card>
   
  );
}

export default Product;

// export default Product;
