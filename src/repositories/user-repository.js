const CrudRepository = require("./crud-repository");
const { logger } = require("../config");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async findOne(data) {
    try {
      const response = await User.findOne(data);
      return response;
    } catch (error) {
      logger.error("Something went wrong in findOne User repo");
      throw error;
    }
  }
}

module.exports = UserRepository;