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
            console.log(companyName)
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
const updatejob=async(req,res)=>{
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
        const jobId = req.params.jobId;

        if (!companyName || !logo || !position || !monthlySalary || !jobType || !mode || !location || !description || !aboutCompany || !skillRequired || !information || !jobId
        ) {
            console.log(companyName)
          return  res.status(400).json({
            errorMessage:"Bad Request"
          })   
        }
        await Job.updateOne(
            { _id: jobId },
            {
                $set: {
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
                },
            }
        );

        res.json({
            message: "job updated succesfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}

const jobDescription=async(req,res)=>{
    try {
        const jobId=req.params.jobId;
        if (!jobId) {
            return res.status(400).json({
                errorMessage: "Bad Request",
            });
        }
        const jobdetails=await Job.findById(jobId);
        res.json({ data:jobdetails});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}
const getalljob=async(req,res)=>{
    try {
        const information=req.query.information ||" ";
        const skills=req.query.skillRequired;
        let filterSkill=skills?.split(" ");
        let filter={};
        if(filterSkill){
            filter = { skills: { $in: filterSkill } };
        }
        const projection = { companyName: 1, skillRequired: 1};
        const joblist=await Job.find(
            {information:{$regex:information,$options:"i"}},
            filter,
            ).select(projection)
        res.json({data:joblist})
    } catch (error) {
        console.error(error);
        res.status(500).json({
            errorMessage: "Internal Server Error"
        });
    }
}

module.exports={
    createjob,
    updatejob,
    jobDescription,
    getalljob
}