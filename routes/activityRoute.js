const express = require("express");
const router = express.Router();
const multer = require('multer');
const activityController = require("../controllers/activityController");

// Set up Multer for image uploads
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage });

router.post("/",upload.single('image'), activityController.createActivity);

module.exports = router;