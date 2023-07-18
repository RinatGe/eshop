import express from 'express';
import Product from '../models/ProductModel.js';
import data from '../data.js';
import User from '../models/UserModel.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  await Product.deleteMany({});
  const creadtedProducts = await Product.insertMany(data.products);

  await User.deleteMany({});
  const creadtedUsers = await User.insertMany(data.users);

  res.send({ creadtedProducts ,creadtedUsers });


});
export default seedRouter;
