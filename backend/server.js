import dotenv from 'dotenv';
import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());//making sure data coming trensfers to json
app.use(express.urlencoded({extended: true}));//arrange cors to go thro domains
app.use('/api/v1/users',userRouter);
app.use('/api/v1/seed', seedRouter);
app.use('/api/v1/products', productRouter);

//middlewere,this is how we work with express handler-if //there is an error it will comne here and get response

app.use((err, req, res, next) => { 
  res.status(500).send({message: err.message});
})

//Endpoints





mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to mongo');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
