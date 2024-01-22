const {User}=require('../models/user.model.js')
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')
const createUser=async(req,res)=>{
    try {
        const {name,email,mobileno,password,termandcondition} = req.body;
        if (!name || !email || !mobileno || !password || !termandcondition) {
            return res.status(400).json({
                message:"Bad Request"
            });
        }
        const isExistingUser = await User.findOne({ email: email });
        if (isExistingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword =  bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            email,
            mobileno,
            password: hashedPassword,
        });
        userResponse=await newUser.save();
        const token=jwt.sign({id:userResponse._id},process.env.JWT_KEY);
        res.status(201).json({ 
            message: 'user registered successfully',
            token:token,
            name:name
        });
    } catch (error) {
       res.json(error.message)
    }
}
module.exports={createUser}