const CrudRepository = require("./crud-repository");
const { Application, Job, Company } = require("../models");
const { logger } = require("../config");

class ApplicationRepository extends CrudRepository {
  constructor() {
    super(Application);
  }

  async getAll(data) {
    try {
      const response = await Application.findAll({
        where: data,
        include: [
          {
            model: Job,
            as: "job",
            include: [{
                model: Company,
                as: 'company',
                attributes: ["id", "name", "logo_url"]
            }]
          },
        ],
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in findOne application repo");
      throw error;
    }
  }
}

module.exports = ApplicationRepository;
