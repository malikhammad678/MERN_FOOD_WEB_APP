import express from 'express';
import multer from 'multer';
import { addFood, listFood, removeFood } from '../controller/foodcontroller.js';

const foodrouter = express.Router();

const storage = multer.diskStorage({
    destination: "upload",
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

foodrouter.post("/add", upload.single("image"), addFood);
foodrouter.get("/list", listFood);
foodrouter.post("/remove", removeFood);

export default foodrouter;
