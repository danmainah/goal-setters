const express = require("express");
const router = express.Router();
const multer = require('multer');
const activityController = require("../controllers/activityController");
const path = require('path');

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

router.post("/",upload.single('image'), activityController.createActivityPost);
router.get("/", activityController.createActivityGet);
router.get("/activity", activityController.getActivity);

module.exports = router;