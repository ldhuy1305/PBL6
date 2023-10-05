const Shipper = require("../models/shipper");
const handleController = require("./handleController");
const authController = require("./authController");

exports.signUpShipper = authController.signUp(Shipper, "Shipper");
exports.verifiedSignUp = authController.verifiedSignUp(Shipper);
exports.getAllShipper = handleController.getAll(Shipper);
exports.getShipperById = handleController.getOne(Shipper);
exports.updateShipper = handleController.putOne(Shipper);
exports.deleteShipper = handleController.delOne(Shipper);
