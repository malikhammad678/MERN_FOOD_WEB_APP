import express, { Router } from "express"

import { loginUser, registerUser } from "../controller/usercontroller.js"

const userRouter = express.Router();

userRouter.post("/login",loginUser);
userRouter.post("/register",registerUser);

export default userRouter;
