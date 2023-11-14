const Store = require("../models/store");
const handleController = require("./handleController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const Owner = require("../models/owner");
const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
exports.createOwner = authController.signUp(Owner, "Owner");
exports.verifiedSignUp = authController.verifiedSignUp(Owner);
exports.uploadOwnerImages = fileUploader.fields([
  { name: "frontImageCCCD", maxCount: 1 },
  { name: "behindImageCCCD", maxCount: 1 },
]);
