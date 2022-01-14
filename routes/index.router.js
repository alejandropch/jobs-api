const express = require('express');
const router = express.Router()
const auth = require('./auth')
const jobs = require('./jobs')
const authentication = require('../middleware/authentication')
router.route('/').get((req,res)=>res.send("This is the job api bro"));

router.use('/auth', auth);
router.use('/jobs', authentication, jobs);
module.exports=router

