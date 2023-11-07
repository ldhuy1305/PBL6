const Store = require("../models/store");
const handleController = require("./handleController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const Owner = require("../models/owner");
const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
exports.createOwner = authController.signUp(Owner, "Owner");
exports.verifiedSignUp = authController.verifiedSignUp(Owner);
exports.createStore = catchAsync(async (req, res, next) => {
  try {
    let body = {
      ...req.body,
      ownerId: req.doc._id,
      phoneNumber: req.body.phoneNumberStore,
      address: req.body.addressStore,
    };
    if (req.files) {
      body = { ...body, image: req.files.image[0]?.path };
    } else {
      return next(new AppError("Vui lòng cung cấp hình ảnh cửa hàng", 500));
    }
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
  { name: "image", maxCount: 1 },
]);
