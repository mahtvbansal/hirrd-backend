const { getMyApplicationsService, getApplicationDataService, updateApplicationStatusService, createNewApplicationService } = require("./application-service");
const { createCompany, getAllCompanies } = require("./company-service");
const { getAllJobsService, createJobsService, updateJobStatusService, getSingleJobService, getMyCreatedJobsService, deleteJobService } = require("./job-service");
const { saveThisJobService, unsaveThisJobService, getAllSavedJobsService } = require("./savedjob-service");
const { createUserService, loginService, setRoleService, getDetailsService } = require("./user-service");

module.exports = {
    createCompany,
    getAllCompanies,
    createJobsService,
    getMyCreatedJobsService,
    updateJobStatusService,
    getAllJobsService,
    getSingleJobService,
    saveThisJobService,
    unsaveThisJobService,
    getAllSavedJobsService,
    createUserService,
    loginService,
    setRoleService,
    getDetailsService,
    getMyApplicationsService,
    getApplicationDataService,
    updateApplicationStatusService,
    createNewApplicationService,
    deleteJobService
}