import jwt from 'jsonwebtoken';
const authMiddleware= async(req,res,next)=>{
try{
const token = req.headers.authorization?.split(" ")[1];
if(!token){
    return res.status(401).json({
        message:"NO token provided",
        success:false
    })
}
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded);
const user = await User.findById(decoded._id).select("-password");
req.user = user;
next();

}
catch(error){
    res.status(401).json({
        message:error.message
    })
}
}
export default authMiddleware;