const {User}=require('../models/user.model.js')
const jwt=require('jsonwebtoken')
const {errorHandler}=require('../middlewere/errorhandler.js')
const bcrypt = require("bcryptjs");
const signin=async(req,res,next)=>{
    const{email,password}=req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                errorMessage:"Bad Request"
            });
        }
        const validEmail=await User.findOne({email});
        if(!validEmail){
            return res.json("Invalid Login details");
        }
        const pass=bcrypt.compareSync(password,validEmail.password)
        if(!pass){
             return new next(Error);
        }
        const token=jwt.sign({id:validEmail._id},process.env.JWT_KEY);
        res
        .status(200)
        .json({
            message:"User logged in successfully",
            token:token,
            name:validEmail.name
        })
        
    } catch (error) {
        next(error);
    }
}
module.exports={
    signin
}