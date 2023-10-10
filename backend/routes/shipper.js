var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");

router
  .route("/")
  .post(shipperController.signUpShipper, shipperController.sendEmailVerify)
  .get(shipperController.getAllShipper);
router
  .route("/:id")
  .post(shipperController.verifiedSignUp)
  .get(shipperController.getShipperById)
  .put(shipperController.updateShipper)
  .delete(shipperController.deleteShipper);

module.exports = router;
