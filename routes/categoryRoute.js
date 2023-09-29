const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

  router.get("/", categoryController.getCategory);
  router.post("/", categoryController.createCategoryPost);
  router.get("/add", categoryController.createCategoryGet);
  router.get("/:category/edit", categoryController.updateCategoryGet);
  router.post("/:category/edit",  categoryController.updateCategoryPost);
  router.post('/:title', categoryController.deleteCategory);

module.exports = router;