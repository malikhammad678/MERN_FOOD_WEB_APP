import express from 'express';

import { addToCart, removeToCart, getCart } from '../controller/cartcontroller.js';
import authMiddleWare from '../middleware/auth.js';
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleWare , addToCart)
cartRouter.post("/remove",authMiddleWare , removeToCart)
cartRouter.post("/get",authMiddleWare , getCart);


export default cartRouter;