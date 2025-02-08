const { StatusCodes } = require("http-status-codes");
const { CompanyRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const companyRepository = new CompanyRepository();

const createCompany = async (data) => {
  try {
    // const existingCompany = await companyRepository.findOne(data);

    // // if company name already exist
    // if (existingCompany) {
    //   throw new AppError("Company name already exist", StatusCodes.BAD_REQUEST);
    // }
    const company = await companyRepository.create(data);
    return company;
  } catch (error) {
    console.log("Something went wrong in createCompany service");
    throw error;
  }
};

const getAllCompanies = async () => {
  try {
    const companies = await companyRepository.getAll();
    return companies;
  } catch (error) {
    console.log("Something went wrong in getAllCompanies service");
    throw error;
  }
};

module.exports = {
  createCompany,
  getAllCompanies,
};
