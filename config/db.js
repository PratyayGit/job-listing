const mongoose=require('mongoose');;
const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.DB_URl);
        console.log("Succesfully connected to Database")
    }catch(error){
        console.log(error)
    }
}
module.exports=connectDb;