var express = require("express");
var router = express.Router();
const ratingController = require("../controllers/ratingController");
router
  .route("/user/:userID/product/:productId")
  .post(ratingController.updatePhoto, ratingController.ratingForProduct);
router
  .route("/user/:userID/shipper/:shipperId")
  .post(ratingController.updatePhoto, ratingController.ratingForShipper);
router
  .route("/user/:userID/store/:storeId")
  .post(ratingController.updatePhoto, ratingController.ratingForStore);
module.exports = router;
