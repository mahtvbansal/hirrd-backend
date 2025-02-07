const CrudRepository = require('./crud-repository')
const { Company } = require('../models');
const { logger } = require('../config');

class CompanyRepository extends CrudRepository {
    constructor () {
        super(Company)
    }

    async findOne (data) {
        try {
            const response = await Company.findOne({ where: { name: data.name } });
            return response;
        } catch (error) {
            logger.error('Something went wrong in findOne company repo')
            throw error;
        }
    }
}

module.exports = CompanyRepository