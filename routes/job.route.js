const express=require('express')
const router = express.Router();
const {createjob,updatejob,jobDescription,getalljob,deletjob}=require('../controllers/job.controller.js')
const {verifyToken}=require('../middlewere/authMiddlewere.js')
router.post('/createjob',verifyToken,createjob);
router.put('/updatejob/:jobId',verifyToken,updatejob);
router.get('/job-description/:jobId',jobDescription);
router.get('/alljob',getalljob);
router.delete('/deletejob/:jobId',verifyToken,deletjob)
module.exports={
    router
}