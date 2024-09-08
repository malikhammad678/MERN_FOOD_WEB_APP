import foodModel from "../models/foodmodel.js";
import fs from "fs";

const addFood = async (req, res) => {
    let image_file = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_file
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Failed to add!" });
    }
};

const listFood = async (req,res) => {
  try{
    const food = await foodModel.find({});
    res.json({success:true, data:food})
  } catch (error) {
     console.log(error);
     res.json({success:false,message:"Error"});
  }   
}

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`, () => {});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"food removed"});
    } catch (error) {
        consolr.log(error);
        res.json({success:false,message:"error"})
    }
}

export { addFood, listFood, removeFood };
