const Shipper = require("../models/shipper");
const handleController = require("./handleController");
const authController = require("./authController");
const catchAsync = require("../utils/catchAsync");

exports.signUpShipper = authController.signUp(Shipper, "Shipper");
exports.verifiedSignUp = authController.verifiedSignUp(Shipper);
exports.sendEmailVerify = authController.sendEmailVerify;
exports.forgotPassword = authController.forgotPassword(Shipper);
exports.resetPassword = authController.resetPassword(Shipper);

exports.getShipperById = handleController.getOne(Shipper);
exports.updateShipper = handleController.putOne(Shipper);
exports.deleteShipper = handleController.delOne(Shipper);
exports.getAllShipper = catchAsync(async (req, res, next) => {
  const shippers = await Shipper.find({
    isAccepted: true,
    isVerified: true,
  });
  return res.status(200).json(shippers);
});
