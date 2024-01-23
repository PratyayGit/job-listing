const {Job}=require('../models/job.model.js')
const createjob=async(req,res)=>{
    try {
        const{
            companyName,
            logo,
            position,
            monthlySalary,
            jobType,
            mode,
            location,
            description,
            aboutCompany,
            skillRequired,
            information
        }=req.body
        if (!companyName || !logo || !position || !monthlySalary || !jobType || !mode || !location || !description || !aboutCompany || !skillRequired || !information
        ) {
          return  res.status(400).json({
            errorMessage:"Bad Request"
          })   
        }
        const jobdetails=new Job({
            companyName,
            logo,
            position,
            monthlySalary,
            jobType,
            mode,
            location,
            description,
            aboutCompany,
            skillRequired,
            information
        })
        await jobdetails.save();
        res.json({
            message: "job created succesfully"
        })
    } catch (error) {
        return res.error
    }
}
module.exports={
    createjob
}