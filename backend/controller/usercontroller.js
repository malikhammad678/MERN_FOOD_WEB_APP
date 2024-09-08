import userModel from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from 'validator';



const loginUser = async (req,res) => {
   const {email,password} = req.body;

   try{
   const user = await userModel.findOne({email});

   if(!user){
   return  res.json({success:true, message:"User Not Exist"});
   }
   
   const isMatch = await bcrypt.compare(password,user.password);

   if(!isMatch) {
    return res.json({success:false,message:"Invalid credentials"})
   }

   const token = createToken(user._id) ;

   res.json({success:true,token})
}
catch(error){
    res.json({success:false,message:"Error"});
}
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_TOKEN);
}


const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist) {
            return res.json({success:false, message:"User already existed"});
        }

        if(!validator.isEmail(email)){
           return  res.json({success:false,message:"Please enter valid email"});
        }

        if(password.length < 8) {
           return  res.json({success:false,message:"Please enter strong password"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true,token});
    } catch (error) {
         console.log(error);
         res.json({success:false,message:"error"});
    }
}

export {loginUser, registerUser};