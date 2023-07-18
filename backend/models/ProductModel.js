import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    price: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    countInStock: { type: String, required: true },
    rating: { type: String, required: true },
    numReviews: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);
const Product = mongoose.model('Product', productSchema);
export default Product;
