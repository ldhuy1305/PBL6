const Shipper = require("../models/shipper");
const handleController = require("./handleController");
const authController = require("./authController");

exports.signUpShipper = authController.signUp(Shipper, "Shipper");
exports.verifiedSignUp = authController.verifiedSignUp(Shipper);
exports.sendEmailVerify = authController.sendEmailVerify;
exports.forgotPassword = authController.forgotPassword(Shipper);
exports.resetPassword = authController.resetPassword(Shipper);
exports.getAllShipper = handleController.getAll(Shipper);
exports.getShipperById = handleController.getOne(Shipper);
exports.updateShipper = handleController.putOne(Shipper);
exports.deleteShipper = handleController.delOne(Shipper);
