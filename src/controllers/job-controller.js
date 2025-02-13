const { StatusCodes } = require("http-status-codes")
const { createJobsService, getMyCreatedJobsService, updateJobStatusService, getAllJobsService, getSingleJobService, deleteJobService } = require("../services")
const { SuccessResponse, ErrorResponse } = require("../utils/common")
const { Sequelize } = require("../models");
const AppError = require("../utils/errors/app-error");


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
        const response  = await getSingleJobService({job_id : req.params.job_id, candidate_id: req.user.userId })
        if(!response) {
            ErrorResponse.error = new AppError("Job not present")
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
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
        const response  = await getMyCreatedJobsService({ recruiter_id : req.user.userId })
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}

const updateJobStatus = async (req, res) => {
    try {
        const response  = await updateJobStatusService({ isOpen : req.body.isOpen }, req.params.job_id)
        SuccessResponse.data = response
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
    }
}

const deleteJob = async (req, res) => {
    try {
        const deletedCount  = await deleteJobService({job_id: req.params.job_id, user_id: req.user.userId})
        if (deletedCount === 0) {
            ErrorResponse.error = new AppError("Either it is not a valid job or you are not authorized to delete it", StatusCodes.BAD_REQUEST) 
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
        }
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse)
    }
}




module.exports = {
    getAllJobsController : getAllJobs,
    getSingleJobController : getSingleJob,
    createJobController : createJob,
    getMyJobsController : getMyJobs,
    updateMyJobStatusController : updateJobStatus,
    deleteJobController: deleteJob
}