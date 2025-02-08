const { SavedJobRepository } = require("../repositories");

const savedJobRepository = new SavedJobRepository();

const saveThisJob = async (data) => {
  try {
    console.log(data);
    const response = savedJobRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const unsaveThisJob = async (data) => {
  try {
    const response = await savedJobRepository.destroy(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllSavedJobs = async (user_id) => {
  try {
    const savedJobs = await savedJobRepository.findAllSavedJobsWithId(user_id);
    return savedJobs;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  saveThisJobService: saveThisJob,
  unsaveThisJobService: unsaveThisJob,
  getAllSavedJobsService: getAllSavedJobs,
};
