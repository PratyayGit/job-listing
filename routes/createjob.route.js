const express=require('express')
const router = express.Router();
const {createjob}=require('../controllers/addJob.controller.js')
const {verifyToken}=require('../middlewere/authMiddlewere.js')
router.post('/createjob',verifyToken,createjob);
module.exports={
    router
}