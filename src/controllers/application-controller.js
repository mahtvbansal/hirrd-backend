const { StatusCodes } = require("http-status-codes");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { createNewApplicationService, getMyApplicationsService, updateApplicationStatusService } = require("../services");

const getMyApplications = async (req, res) => {
  try {
    const applications = await getMyApplicationsService({candidate_id: req.user.userId})
    SuccessResponse.data = applications
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getApplicationData = async (req, res) => {
  try {
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const response = await updateApplicationStatusService(req.body, req.params.application_id)
    SuccessResponse.data = response
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createNewApplication = async (req, res) => {
  try {
    const file = req.file; // Uploaded file info
    console.log(req.body, file);
    const response = await createNewApplicationService({
      ...req.body,
      resume: `/uploads/resumes/${file.filename}`,
    });
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

module.exports = {
  getMyApplicationsController: getMyApplications,
  getApplicationDataController: getApplicationData,
  updateApplicationStatusController: updateApplicationStatus,
  createNewApplicationController: createNewApplication,
};
