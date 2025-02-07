const SavedJobRepository = require("../repositories/savedjob-repository")

const savedJobRepository = new SavedJobRepository()

const saveThisJob = async (data) => {
    try {
        console.log(data)
        const response = savedJobRepository.create(data)
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const unsaveThisJob = async (data) => {
    try {
        const response = await savedJobRepository.destroy(data)
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getAllSavedJobs = async (data) => {
    try {
        console.log(data)
        const response = await await savedJobRepository.getAll(data)
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    saveThisJobService : saveThisJob,
    unsaveThisJobService : unsaveThisJob,
    getAllSavedJobsService : getAllSavedJobs
}
