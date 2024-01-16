const {User}=require('../models/user.model.js')
const createUser=async(req,res)=>{
    try {
        const newUser=new User(req.body);
        await newUser.save();
        
        res.status(201).json({ message: 'user registered successfully' });
    } catch (error) {
       res.json(error.message)
    }
}
module.exports={createUser}