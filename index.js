const express=require('express');
const dotenv=require('dotenv');
const app=express();
dotenv.config();

// health api
app.get("/health",(req,res)=>{
    try {
        res.json({
            service:"server is running",
            status:"Active",
            time:new Date()
        });
    } catch (error) {
        console.log(error)   
    }
});

app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server is Running`)
})