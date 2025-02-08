const express = require("express");
const { authMiddleWare } = require("../../../middlewares");
const { companiesController } = require("../../../controllers");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads", // Folder to store files
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

router.get("/", authMiddleWare, companiesController.getAllCompanies);
router.post(
  "/",
  authMiddleWare,
  upload.single("logo"),
  companiesController.addNewCompany
);

module.exports = router;
