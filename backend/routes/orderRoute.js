import express from "express";
import { listOrders, placeOrder, updateOrder, userOrder, verifyOrder } from "../controller/ordercontroller.js";
import authMiddleWare from "../middleware/auth.js";
const orderRoute = express.Router();

orderRoute.post("/placeorder", authMiddleWare ,  placeOrder);
orderRoute.post("/verify", verifyOrder);
orderRoute.post("/userorder", authMiddleWare, userOrder);
orderRoute.get("/list", listOrders);
orderRoute.post("/update", updateOrder);


export default orderRoute;