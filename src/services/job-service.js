const { JobRepository } = require("../repositories");

const jobRepository = new JobRepository();

const getAllJobs = async ({user_id, query}) => {
  try {
    const jobs = await jobRepository.getAllJobs({user_id, query});
    const jobsWithSavedFlag = jobs.map((job) => {
      const isSaved = job.savedJobs && job.savedJobs.length > 0; // Check if any saved entries exist
      const response = {
        ...job.get({ plain: true }), // Convert to plain object for easier manipulation
        saved: isSaved,
      }
      delete response.savedJobs
      return response;
    });

    return jobsWithSavedFlag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getSingleJob = async (id) => {
  try {
    const response = await jobRepository.findOne(id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createJob = async (data) => {
  try {
    const response = await jobRepository.create(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const findMyJobs = async (data) => {
  try {
    const response = await jobRepository.getAll(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateJobStatus = async (data, id) => {
  try {
    const response = await jobRepository.update(data, id);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getAllJobsService: getAllJobs,
  getSingleJobService: getSingleJob,
  createJobsService: createJob,
  findMyJobsService: findMyJobs,
  updateJobStatusService: updateJobStatus,
};
