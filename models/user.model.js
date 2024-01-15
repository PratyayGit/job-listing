const mongoose =require('mongoose')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    mobileno:{
        type:Number,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true
    },
    termandcondition:{
        type:Boolean,
        require:true
    }
});
const User =mongoose.model('User',userSchema);
module.exports=User;