const express = require('express')
const multer  = require('multer')
const { companiesController, JobsController, SavedJobsController, UserController} = require('../../controllers');
const { authMiddleWare } = require('../../middlewares');

const router = express.Router()

const storage = multer.diskStorage({
    destination: "./uploads", // Folder to store files
    filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname); // Unique filename
    },
  });
  
const upload = multer({ storage });


// company routes
router.get('/companies', authMiddleWare, companiesController.getAllCompanies)
router.post('/companies', authMiddleWare, upload.single('logo'), companiesController.addNewCompany)


// job routes
router.get('/jobs', authMiddleWare, JobsController.getAllJobsController) // Get All Jobs
router.get('/jobs/:job_id', authMiddleWare, JobsController.getSingleJobController) // Get Single Job

router.post('/jobs/save', authMiddleWare, SavedJobsController.saveThisJobController) // Save Job for the user
router.delete('/jobs/unsave', authMiddleWare, SavedJobsController.unsaveThisJobController) // unsave this job
router.get('/jobs/saved/:user_id', authMiddleWare, SavedJobsController.getAllSavedJobsController) // Get All Saved Jobs for the user

router.post('/jobs', authMiddleWare, JobsController.createJobController)
router.get('/jobs/recruiter/:recruiter_id', authMiddleWare, JobsController.getMyJobsController)
router.patch('jobs/:job_id', authMiddleWare, JobsController.updateMyJobStatusController )


// login - register
router.post('/users/signup', UserController.signupController)
router.post('/users/login', UserController.loginController)
router.post('/users/role', authMiddleWare, UserController.changeRoleController)



module.exports = router