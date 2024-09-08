import userModel from "../models/usermodel.js";
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeToCart = async (req, res) => {

   try{
   let userData = await userModel.findById({ _id: req.body.userId });

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
     }

     await userModel.findByIdAndUpdate(req.body.userId, {cartData})

     res.json({success:true,message:"Delete from cart"});
   }
   catch(error){
      console.log(error);
      res.json({success:false,message:"Error"});
   }

};

const getCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = userData.cartData || {};
      res.json({success:true,cartData});
   } catch (error) {
      console.log(error);
      res.json({success:false, message:"Error"})
   }
};

export { addToCart, removeToCart, getCart };
