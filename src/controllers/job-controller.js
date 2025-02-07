const { StatusCodes } = require("http-status-codes")
const { createJobsService, findMyJobsService, updateJobStatusService, getAllJobsService, getSingleJobService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")
const { Sequelize } = require("../models");


const getAllJobs = async (req, res) => {
    try {
        const user_id = req.user.userId
        const query = req.query
        if (req.query.searchQuery) {
            query.title = { [Sequelize.Op.like]: `%${req.query.searchQuery}%` }
            delete query.searchQuery
        } 
        const response  = await getAllJobsService({user_id, query })
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}

const getSingleJob = async (req, res) => {
    try {
        const response  = await getSingleJobService(req.params.job_id)
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}

const createJob = async (req, res) => {
    try {
        const response = await createJobsService(req.body)
        SuccessResponse.data = response
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
    
}


const getMyJobs = async (req, res) => {
    try {
        console.log(req.params)
        const response  = await findMyJobsService({ recruiter_id : req.params.recruiter_id })
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}

const updateJobStatus = async (req, res) => {
    try {
        console.log(req.params, req.body)
        // const response  = await updateJobStatusService({ status : true })
        // SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}




module.exports = {
    getAllJobsController : getAllJobs,
    getSingleJobController : getSingleJob,
    createJobController : createJob,
    getMyJobsController : getMyJobs,
    updateMyJobStatusController : updateJobStatus,
}