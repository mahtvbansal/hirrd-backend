const CrudRepository = require("./crud-repository");
const { logger } = require("../config");
const { Job, Company, SavedJob, Application } = require("../models");
const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize()

class JobRepository extends CrudRepository {
  constructor() {
    super(Job);
  }

  async getJobWithApplicationsData({ job_id, candidate_id }) {
    try {
      const response = await Job.findOne({
        where: { id: job_id },
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["logo_url", "id"],
          },
          {
            model: Application,
            as: "applications",
            required: false, // Ensure job is returned even if user hasn't applied
          },
        ],
        attributes: {
          include: [
            [
              Sequelize.literal(
                `(SELECT COUNT(*) > 0 FROM applications WHERE applications.job_id = Job.id AND applications.candidate_id = '${candidate_id}')`
              ),
              "hasApplied",
            ],
          ],
        },
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in findOne job repo");
      throw error;
    }
  }

  async getAllJobs({ user_id, query }) {
    try {
      const response = await this.model.findAll({
        where: query,
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["id", "logo_url"],
          },
          {
            model: SavedJob,
            as: "savedJobs", // Use the correct alias here
            required: false,
            where: { user_id: user_id }, // Filter by current user
            attributes: ["job_id"], // Only need the jobId if it exists
          },
        ],
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while getting All data");
      throw error;
    }
  }

  async getMyJobs(query) {
    try {
      const response = await this.model.findAll({
        where: query,
        include: [
          {
            model: Company,
            as: "company",
            attributes: ["id", "logo_url"],
          },
        ],
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while getting All data");
      throw error;
    }
  }
}

module.exports = JobRepository;
