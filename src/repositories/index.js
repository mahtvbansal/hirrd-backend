const ApplicationRepository = require("./application-repository");
const CompanyRepository = require("./company-repository");
const JobRepository = require("./job-repository");
const SavedJobRepository = require("./savedjob-repository");
const UserRepository = require("./user-repository");

module.exports = {
    CompanyRepository,
    UserRepository,
    JobRepository,
    SavedJobRepository,
    ApplicationRepository
}