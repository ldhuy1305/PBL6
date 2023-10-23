var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");
const authController = require("../controllers/authController");

router
  .route("/")
  .post(
    shipperController.uploadShipperImages,
    shipperController.signUpShipper,
    shipperController.sendEmailVerify
  )
  .get(
    authController.protect,
    authController.restrict("Admin"),
    shipperController.getAllShipper
  );
router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrict("Shipper"),
    shipperController.getShipperById
  )
  .patch(
    authController.protect,
    authController.restrict("Shipper"),
    shipperController.updatePhoto, shipperController.updateShippe
  )
  .delete(
    authController.protect,
    authController.restrict("Admin"),
    shipperController.deleteShipper
  );

router.route("/:email").post(shipperController.verifiedSignUp);

module.exports = router;
