const express = require("express");
const multer = require("multer");
const { authMiddleWare } = require("../../../middlewares");
const { ApplicationController } = require("../../../controllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/resumes", // Folder to store files
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Unique filename
  },
});

const resumeUpload = multer({ storage });

// Get User's Applications
router.get(
  "/",
  authMiddleWare,
  ApplicationController.getMyApplicationsController
);

// Create New Applications
router.post(
  "/",
  authMiddleWare,
  resumeUpload.single("resume"),
  ApplicationController.createNewApplicationController
);

// Update Applications Status
router.patch(
  "/:application_id",
  authMiddleWare,
  ApplicationController.updateApplicationStatusController
);

module.exports = router