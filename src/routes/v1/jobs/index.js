const express = require("express");
const { authMiddleWare } = require("../../../middlewares");
const { JobsController, SavedJobsController } = require("../../../controllers");

const router = express.Router();

router.get("/", authMiddleWare, JobsController.getAllJobsController); // Get All Jobs
router.post("/", authMiddleWare, JobsController.createJobController); // create New Job

router.post(
  "/save",
  authMiddleWare,
  SavedJobsController.saveThisJobController
); // Save Job for the user

router.delete(
  "/unsave",
  authMiddleWare,
  SavedJobsController.unsaveThisJobController
); // unsave this job

router.get(
  "/saved",
  authMiddleWare,
  SavedJobsController.getAllSavedJobsController
); // Get All Saved Jobs for the user


router.get(
  "/recruiter",
  authMiddleWare,
  JobsController.getMyJobsController
);

router.patch(
  "/:job_id",
  authMiddleWare,
  JobsController.updateMyJobStatusController
);

router.get(
  "/:job_id",
  authMiddleWare,
  JobsController.getSingleJobController
); // Get Single Job


router.delete(
  "/:job_id",
  authMiddleWare,
  JobsController.deleteJobController
); // Get Single Job

module.exports = router;
