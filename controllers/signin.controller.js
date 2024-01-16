const {User}=require('../models/user.model.js')
const jwt=require('jsonwebtoken')
const signin=async(req,res)=>{
    const{email,password}=req.body;
    try {
        const validEmail=await User.findOne({email});
        if(!validEmail){
            return res.json("Invalid Login details");
        }
        const pass=await validEmail.password===password;
        if(!pass){
            return res.json("Invalid login details");
        }
        const token=jwt.sign({id:validEmail._id},process.env.JWT_KEY);
        res.cookie('access_token',token,{httpOnly:true}).status(200).json("successfully login")
        
    } catch (error) {
        return res.json(error)
    }
}
module.exports={
    signin
}