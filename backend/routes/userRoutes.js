import express from 'express';
import User from '../models/UserModel.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post(
  'signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
  })
);

export default userRouter;
