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

const getSingleJob = async ({ job_id, candidate_id}) => {
  try {
    const response = await jobRepository.getJobWithApplicationsData({ job_id, candidate_id});
    response.dataValues.hasApplied = Boolean(response.dataValues.hasApplied);

    response.dataValues.applicants = response.dataValues.applications.length;
    const recruiterId = response.dataValues.recruiter_id;
    if (candidate_id === recruiterId) {
      delete response.dataValues.hasApplied;
    } else {
      delete response.dataValues.applications;
    }
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
const getMyCreatedJobs = async (data) => {
  try {
    const response = await jobRepository.getMyJobs(data);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateJobStatus = async (data, id) => {
  try {
    const response = await jobRepository.update(data, {id});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteJob = async ({user_id, job_id}) => {
  try {
    const response = await jobRepository.destroy({id: job_id, recruiter_id : user_id})
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
  getMyCreatedJobsService: getMyCreatedJobs,
  updateJobStatusService: updateJobStatus,
  deleteJobService: deleteJob
};
