var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
const shipperController = require("../controllers/shipperController");
const ownerController = require("../controllers/ownerController");
const userController = require("../controllers/userController");
const storeController = require("../controllers/storeController");
router.use(authController.protect, authController.restrict("Admin"));
router.get("/", adminController.getListAllAdmin);
// Manage Shipper
router.get("/shipper/approve", adminController.getListShipperAppove);
router.route("/shipper").get(shipperController.getAllShipper);
router
  .route("/shipper/:id")
  .patch(adminController.appoveShipperAccount)
  .get(shipperController.getShipperById);

// Manage Owner
router.get("/owner/approve", adminController.getListOwnerAppove);
router
  .route("/owner/:id")
  .patch(adminController.appoveOwnerAccount)
  .get(storeController.getStoreByOwnerId);

// Manage Store
router.route("/store").get(storeController.getAllStore);
router.route("/store/:id").get(storeController.getStoreByStoreId);

module.exports = router;
