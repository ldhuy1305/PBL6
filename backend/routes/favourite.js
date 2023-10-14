var express = require("express");
var router = express.Router();
const favouriteController = require("../controllers/favouriteController");
router.route("/:userId/:productId").post(favouriteController.favourProduct);
//   .delete(favouriteController.unFavourProduct);
router.route("/user/:userId").get(favouriteController.getFavouritesByUserId);
router
  .route("/product/:productId")
  .get(favouriteController.getFavouritesByProductId);
module.exports = router;
