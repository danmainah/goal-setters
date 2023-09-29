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

  router.post("/", upload.single('image'), activityController.createActivityPost);
  router.get("/add", activityController.createActivityGet);
  router.get("/:title", activityController.getActivity);
  router.get("/:title/edit", activityController.updateActivityGet);
  router.post("/:title/edit", upload.single('image'), activityController.updateActivityPost);
  router.post('/:title', activityController.deleteActivity);

module.exports = router;