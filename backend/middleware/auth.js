import jwt from 'jsonwebtoken';

const authMiddleWare = async (req,res,next) => {
   const {token} = req.headers;
   if(!token){
    return res.json({success:false,message:"Login Again!"})
   }

   try {
    const token_decode = jwt.verify(token,process.env.JWT_TOKEN);
    req.body.userId = token_decode.id;
    next()
   } catch (error) {
    console.log(error);
    res.json({success:false, message:"error"})
   }
}

export default authMiddleWare;