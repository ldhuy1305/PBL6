var express = require("express");
var router = express.Router();
const shipperController = require("../controllers/shipperController");
router.post("/", shipperController.signUpShipper);
router.get("/:id", shipperController.getShipperById);
router.get("/", shipperController.getAllShipper);
router.put("/:id", shipperController.updateShipper);
router.delete("/:id", shipperController.deleteShipper);
module.exports = router;
