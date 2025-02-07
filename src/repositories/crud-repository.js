const { logger } = require("../config");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      console.log(error);
      logger.error("Something went wrong in crud repo while creating");
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({
        where: data,
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while destroying");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while getting data");
      throw error;
    }
  }

  async getAll(data) {
    try {
      const response = await this.model.findAll({
        where: data,
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while getting All data");
      throw error;
    }
  }

  async update(data, id) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
      return response;
    } catch (error) {
      logger.error("Something went wrong in crud repo while updating data");
      throw error;
    }
  }
}

module.exports = CrudRepository;
