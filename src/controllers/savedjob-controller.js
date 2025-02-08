const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { saveThisJobService, unsaveThisJobService, getAllSavedJobsService } = require("../services");

const saveThisJob = async (req, res) => {
  try {
    const response = await saveThisJobService({
      job_id: req.body.job_id,
      user_id: req.user.userId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
  }
};

const unsaveThisJob = async (req, res) => {
  try {
    const response = await unsaveThisJobService({
      job_id: req.body.job_id,
      user_id: req.user.userId,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
  }
};

const getAllSavedJobs = async (req, res) => {
  try {
    const user_id = req.user.userId
    const response  = await getAllSavedJobsService(user_id)
    SuccessResponse.data = response
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveThisJobController: saveThisJob,
  getAllSavedJobsController: getAllSavedJobs,
  unsaveThisJobController: unsaveThisJob,
};
