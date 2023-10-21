var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");

router
  .route("/")
  .post(
    shipperController.uploadShipperImages,
    shipperController.signUpShipper,
    shipperController.sendEmailVerify
  )
  .get(shipperController.getAllShipper);
router
  .route("/:id")
  .get(shipperController.getShipperById)
  .patch(shipperController.updatePhoto, shipperController.updateShipper)
  .delete(shipperController.deleteShipper);

router.route("/:email").post(shipperController.verifiedSignUp);

module.exports = router;
