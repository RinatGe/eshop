import { useParams } from "react-router-dom";



function ProductPage() {
const params = useParams();
const { token } = params;

  return (
    <div>
      <h1>{token}</h1>
    </div>
  );
}
export default ProductPage;
