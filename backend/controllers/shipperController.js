const Shipper = require("../models/shipper");
const handleController = require("./handleController");
const authController = require("./authController");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");
const appError = require("../utils/appError");
const ApiFeatures = require("../utils/ApiFeatures");
const cloudinary = require("cloudinary").v2;
const Order = require("../models/order");

exports.signUpShipper = authController.signUp(Shipper, "Shipper");
exports.verifiedSignUp = authController.verifiedSignUp(Shipper);
exports.sendEmailVerify = authController.sendEmailVerify;

exports.getShipperById = handleController.getOne(Shipper);

exports.deleteShipper = handleController.delOne(Shipper);
exports.getAllShipper = catchAsync(async (req, res, next) => {
  // const shippers = await Shipper.find().select("+isAccepted +isVerified");
  let obj = {
    isAccepted: true,
    isVerified: true,
  };
  const features = new ApiFeatures(Shipper.find(obj), req.query)
    .search()
    .limitFields()
    .paginate();
  shippers = await features.query;
  return res.status(200).json({
    length: shippers.length,
    data: shippers,
  });
});

exports.uploadShipperImages = fileUploader.fields([
  { name: "frontImageCCCD", maxCount: 1 },
  { name: "behindImageCCCD", maxCount: 1 },
  { name: "licenseImage", maxCount: 1 },
  { name: "vehicleLicense", maxCount: 1 },
]);

exports.updatePhoto = fileUploader.single("photo");

exports.updateShipper = catchAsync(async (req, res, next) => {
  const shipper = await Shipper.findById({ _id: req.params.id });
  if (!shipper) {
    return next(new appError("No document found with that ID", 404));
  }
  const body = {
    phoneNumber: req.body.phoneNumber,
    photo: req.file ? req.file.path : shipper.photo,
  };
  try {
    const doc = await Shipper.findByIdAndUpdate({ _id: req.params.id }, body, {
      new: true,
      runValidators: true,
    });
    let parts = shipper.photo.split("/");
    let id =
      parts.slice(parts.length - 2, parts.length - 1).join("/") +
      "/" +
      parts[parts.length - 1].split(".")[0];
    cloudinary.uploader.destroy(id);
    res.status(200).json({
      data: doc,
    });
  } catch (err) {
    if (req.file) {
      cloudinary.uploader.destroy(req.file.filename);
    }
    next(err);
  }
});
exports.setCoordinates = catchAsync(async (req, res, next) => {
  const { id, lat, lng } = req.params;

  const coordinates = [parseFloat(lat), parseFloat(lng)];

  const shipper = await Shipper.findByIdAndUpdate(
    id,
    {
      $set: {
        location: {
          type: "Point",
          coordinates: coordinates,
        },
      },
    },
    { new: true }
  );

  if (!shipper) return next(new appError("Không tìm thấy shipper", 404));
  res.status(200).json({
    status: "success",
    data: shipper,
  });
});

// find Orders near by Shipper <
exports.findOrdersNearByShipper = catchAsync(async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const shipper = await Shipper.findById(req.params.id);
  const coordinates = shipper.location.coordinates.reverse();
  const order = await Order.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates,
        },
        key: "storeLocation",
        maxDistance: 10 * 1000,
        distanceField: "dist.calculated",
        query: { status: "Pending" },
        spherical: true,
      },
    },
    {
      $project: {
        _id: 1,
        status: 1,
        storeLocation: 1,
        dist: "$dist.calculated",
      },
    },
    {
      $sort: {
        "dist.calculated": 1,
      },
    },
    {
      $skip: (page - 1) * limit,
    },
    {
      $limit: limit,
    },
  ]);
  res.status(200).json({
    status: "success",
    length: order.length,
    data: order,
  });
});
