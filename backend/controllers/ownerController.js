const Store = require("../models/store");
const handleController = require("./handleController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const Owner = require("../models/owner");
const fileUploader = require("../utils/uploadImage");

exports.createOwner = authController.signUp(Owner, "Owner");
exports.verifiedSignUp = authController.verifiedSignUp(Owner);
exports.createStore = catchAsync(async (req, res, next) => {
  try {
    req.body.phoneNumber = req.body.phoneNumberStore;
    req.body.address = req.body.addressStore;
    const body = { ...req.body, ownerId: req.doc._id };

    console.log(body);
    const storeCreated = await Store.create(body);
    res.store = storeCreated;
    next();
  } catch (err) {
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((file) =>
          cloudinary.uploader.destroy(file.filename)
        );
      });
    }
    next(err);
  }
});
exports.uploadOwnerImages = fileUploader.fields([
  { name: "frontImageCCCD", maxCount: 1 },
  { name: "behindImageCCCD", maxCount: 1 },
]);
