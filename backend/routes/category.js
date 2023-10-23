var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");
router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.uploadCategoryImage, categoryController.addCategory);
router.route("/store/:id").get(categoryController.getAllCategoryByStore);
module.exports = router;
