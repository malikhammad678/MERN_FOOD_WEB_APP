import express from 'express';
import cors from 'cors';

import { dbConnect } from './config/db.js';
import foodrouter from './routes/foodroute.js';
import userRouter from './routes/userRouter.js';

import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRoute from './routes/orderRoute.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

dbConnect();

app.use("/app/food", foodrouter);
app.use("/images",express.static("upload"));
app.use("/app/user",userRouter);
app.use("/app/cart",cartRouter);
app.use("/app/order", orderRoute);

app.listen(port, () => {
    console.log(`App is start on port http://localhost:${port}`);
});
