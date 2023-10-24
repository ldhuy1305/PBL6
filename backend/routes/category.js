var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authController");
router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(
    // authController.protect,
    // authController.restrict("Owner"),
    categoryController.uploadCategoryImage,
    categoryController.addCategory
  );
router
  .route("/store/:id")
  .get(
    authController.protect,
    authController.restrict("Owner"),
    categoryController.getAllCategoryByStore
  );
module.exports = router;
