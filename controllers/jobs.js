const Job = require('../models/Job')
const Boom = require('@hapi/boom')
const getAllJobs = async (req,res,next) => {
    const jobs = await Job.find({createdBy:req.user.userID}).sort('createdAt')
    res.status(200).json({jobs, nbhits:jobs.length})
}
const getOneJob = async (req,res,next) => {
    const {
        params: {id: jobID},
        user:{userID}
    } = req

    const job = await Job.findOne({
        _id: jobID, createdBy: userID
    })
    if(!job){
        throw Boom.notFound("Invalid job id")
    }
    res.status(200).json({job})
}
const createJob = async(req,res,next) => {
    req.body.createdBy = req.user.userID
    const {
        body,
        user: {username}
    } = req
    const jobCreated =await Job.create({body})

    res.status(201).json({jobCreated, createdBy: username})
}
const updateJob = async (req,res,next) => {
    const {params:{id: jobID}, user:{userID}, body: dataCandidate} = req
    if(!dataCandidate.company || !dataCandidate.position) {
        throw Boom.badRequest("Company and Position must be provided")
    }
    const job = await Job.findOneAndUpdate(
         {_id: jobID, createdBy: userID},
         dataCandidate,
         {new: true, runValidators: true}
        )
    if(!job){
        throw Boom.notFound("Invalid job id")
    }
    res.status(200).json({msg:"Job updated", job})

}
const deleteJob = async (req,res,next) => {
    const {
        params: {id: jobID},
        user: {userID}
    } = req
    const deletedJob = await Job.findOneAndDelete({_id:jobID, createdBy: userID})
    if(!deletedJob){
        throw Boom.notFound("Invalid job id")
    }
    res.status(200).json({message:"Deleted"})
}
module.exports={getAllJobs, getOneJob, createJob, updateJob, deleteJob}