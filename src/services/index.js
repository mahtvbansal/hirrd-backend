const { createCompany, getAllCompanies } = require("./company-service");
const { getAllJobsService, createJobsService, findMyJobsService, updateJobStatusService, getSingleJobService } = require("./job-service");
const { saveThisJobService, unsaveThisJobService, getAllSavedJobsService } = require("./savedjob-service");
const { createUserService, loginService, setRoleService } = require("./user-service");

module.exports = {
    createCompany,
    getAllCompanies,
    createJobsService,
    findMyJobsService,
    updateJobStatusService,
    getAllJobsService,
    getSingleJobService,
    saveThisJobService,
    unsaveThisJobService,
    getAllSavedJobsService,
    createUserService,
    loginService,
    setRoleService
}