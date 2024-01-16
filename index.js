const express=require('express');
const dotenv=require('dotenv');
const bodyParser = require('body-parser');
const connectDb=require('./config/db.js')
const app=express();
dotenv.config();
const {router:registerRoute}=require('./routes/register.route.js')
const {router:signinRoute}=require('./routes/signin.route.js')
app.use(express.json());
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
app.use('/api',registerRoute);
app.use('/api',signinRoute);
connectDb();
app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server is Running`)
})
