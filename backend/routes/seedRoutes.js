import express  from "express";
import Product from "../models/prudoctModel.js";
import data from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/',async (req,res)=>{
    await Product.deleteMany({});
        const creadtedProducts = await Product.insertMany(data.products);
        res.send({creadtedProducts});
        

});
export default seedRouter;