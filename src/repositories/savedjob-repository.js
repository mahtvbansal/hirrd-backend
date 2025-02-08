const CrudRepository = require("./crud-repository");
const { SavedJob, Job, Company } = require("../models");
const { logger } = require("../config");

class SavedJobRepository extends CrudRepository {
  constructor() {
    super(SavedJob);
  }

  async findAllSavedJobsWithId(user_id) {
    try {
      const response = await SavedJob.findAll({
        where: { user_id },
        include: [
          {
            model: Job,
            as: "job",
            include: [
              {
                model: Company,
                as: "company",
                attributes: ["id", "logo_url"],
              },
            ],
          },
        ],
        attributes: []
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in saved job repo");
      throw error;
    }
  }
}

module.exports = SavedJobRepository;
