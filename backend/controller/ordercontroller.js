import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Log incoming request data
        console.log("Received order request:", req.body);

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 80
            },
            quantity: item.quantity // Fixed spelling here
        }));

        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100 * 80
            },
            quantity: 1 // Fixed spelling here
        });

        // Log line_items
        console.log("Line items:", line_items);

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Log session details
        console.log("Stripe session created:", session);

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, message: "An error occurred" });
    }
};

const verifyOrder = async (req,res) => {
    const {orderId, success} = req.body;
    try {
        if(success == "true") {
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Paid"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"});
        }
    } catch (error) {
        res.json({success:false,message:"Error"});
    }
}

const userOrder = async (req,res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId});
    res.json({success:true,data:orders})
  } catch (error) {
    res.json({success:false,message:"Error"});
  }
}

const listOrders = async (req,res) => {
  try {
    const AllOrders = await orderModel.find({});
    res.json({success:true, data:AllOrders});
  } catch (error) {
    res.json({success:false, message:"Error"});
  }
}

const updateOrder = async (req,res) => {
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId , {status : req.body.status})
        res.json({success:true,message:"Status Updated"})
    }
    catch(error) {
        res.json({success:false,message:"Error"});
    }
}

export { placeOrder, verifyOrder, userOrder, listOrders,updateOrder };
