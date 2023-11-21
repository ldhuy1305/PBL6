var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");
const authController = require("../controllers/authController");
const contactController = require("../controllers/contactController");
const ratingRoute = require("./rating");

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
    // authController.restrict("Shipper"),
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

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router.use("/:shipperId/rating", ratingRoute);
module.exports = router;
