var express = require("express");
var router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
router.use(authController.protect, authController.restrict("Admin"));
router.get("/shipper", adminController.getListShipperAppove);
router.get("/owner", adminController.getListOwnerAppove);
router.get("/", adminController.getListAllAdmin);
router.patch("/shipper/:id", adminController.appoveShipperAccount);
router.patch("/owner/:id", adminController.appoveOwnerAccount);

module.exports = router;
