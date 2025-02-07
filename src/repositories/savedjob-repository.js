const CrudRepository = require('./crud-repository')
const { SavedJob } = require('../models');
const { logger } = require('../config');

class SavedJobRepository extends CrudRepository {
    constructor () {
        super(SavedJob)
    }
}

module.exports = SavedJobRepository