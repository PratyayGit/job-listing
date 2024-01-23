const jwt=require("jsonwebtoken")
const verifyToken=async (req,res,next)=>{
 try {
    const token=req.header("Authorization");
    if(!token){
        return res.status(401).json({message:"Unauthorize User"})
    }
    const decode=jwt.verify(token,process.env.JWT_KEY)
    if(!decode){
        return res.status(401).json({message:"invalid token"})
    }
    next()
 } catch (error) {
    return res.error
 }
}
module.exports={
    verifyToken
}