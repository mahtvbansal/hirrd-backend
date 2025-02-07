const { StatusCodes } = require("http-status-codes");
const { createCompany : createCompanyService, getAllCompanies : getAllCompaniesService } = require("../services");

const { ErrorResponse, SuccessResponse } = require('../utils/common')

const getAllCompanies = async (req, res) => {
  try {
    const result = await getAllCompaniesService()
    SuccessResponse.data = result
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    ErrorResponse.message = error.message
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
};

const addNewCompany = async (req, res) => {
  const { name } = req.body;
  const file = req.file; // Uploaded file info

  if (!name || !file) {
    return res
      .status(400)
      .json({ error: "Company name and logo are required." });
  }

  try {
    const result = await createCompanyService({
      name,
      logo_url: `/uploads/${file.filename}`,
    });
    SuccessResponse.data = result;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);

  } catch (error) {

    ErrorResponse.error = error;
    ErrorResponse.message = error.message
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  
};

module.exports = {
  getAllCompanies,
  addNewCompany,
};
