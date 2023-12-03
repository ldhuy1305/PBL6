var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");

router
  .route("/")
  .post(
    shipperController.uploadShipperImages,
    contactController.createContact,
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
    shipperController.updatePhoto,
    shipperController.updateShipper
  )
  .delete(
    authController.protect,
    authController.restrict("Admin"),
    shipperController.deleteShipper
  );

router.route("/:email").post(shipperController.verifiedSignUp);
router.route("/:id/lat/:lat/lng/:lng").post(shipperController.setCoordinates);
router.route("/:id/find-orders").get(shipperController.findOrdersNearByShipper);
router.route("/:id/daily").get(shipperController.getOrdersDaily);
router.route("/:id/weekly").get(shipperController.getOrdersWeekly);
router.route("/:id/monthly").get(shipperController.getOrdersMonthly);
module.exports = router;
