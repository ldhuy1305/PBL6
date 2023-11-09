var express = require("express");
var router = express.Router();
const ratingController = require("../controllers/ratingController");
router
  .route("/user/:userID/product/:productId")
  .post(ratingController.ratingForProduct);
router
  .route("/user/:userID/shipper/:shipperId")
  .post(ratingController.ratingForShipper);
router
  .route("/user/:userID/store/:storetId")
  .post(ratingController.ratingForStore);
module.exports = router;
