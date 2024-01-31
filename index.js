const express=require('express');
const dotenv=require('dotenv');
// const bodyParser = require('body-parser');
const connectDb=require('./config/db.js')
const {errorHandler}=require('./middlewere/errorhandler.js')
const app=express();
dotenv.config();
//importing routers
const {router:registerRoute}=require('./routes/register.route.js')
const {router:signinRoute}=require('./routes/signin.route.js')
const {router:jobRoute}=require('./routes/job.route.js')
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
app.use('/api',jobRoute);

// Example of using the error handler
app.use((error, req, res, next) => {
    errorHandler(error, req, res, next);
  });
  
connectDb();
app.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`Server is Running`)
})
