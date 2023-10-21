var express = require("express");
var router = express.Router();
const mapController = require("../controllers/mapController");
router.route("/").get(mapController.setAddress);
router.route("/geocode").get(mapController.getGeoCode);
router.route("/address").get(mapController.getAddress);
router.route("/distance").get(mapController.getDistance);
module.exports = router;
