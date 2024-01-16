const express=require('express')
const router = express.Router();

const {signin}=require('../controllers/signin.controller.js')
router.post('/signin',signin);
module.exports={router}