const Rating = require("../models/rating");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
const ApiFeatures = require("../utils/ApiFeatures");

class ratingController {
  updatePhoto = fileUploader.single("image");
  ratingForShipper = catchAsync(async (req, res, next) => {
    if (!req.body.reference) {
      if (req.params.shipperId) {
        req.body.reference = req.params.shipperId;
        req.body.onModel = "Shipper";
      } else if (req.params.productId) {
        req.body.reference = req.params.productId;
        req.body.onModel = "Product";
      } else if (req.params.storeId) {
        req.body.reference = req.params.storeId;
        req.body.onModel = "Store";
      }
    }
    if (!req.body.user) req.body.user = req.user.id;
    let body = {
      ...req.body,
    };
    if (req.file) {
      body = {
        ...body,
        image: req.file?.path,
      };
    }
    await Rating.create(body)
      .then((rating) => {
        res.status(201).json(rating);
      })
      .catch((err) => {
        if (req.file) {
          cloudinary.uploader.destroy(req.file.filename);

          next(err);
        }
      });
  });
  getAllRatings = catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.shipperId)
      filter = { reference: req.params.shipperId, onModel: "Shipper" };
    else if (req.params.productId)
      filter = { reference: req.params.productId, onModel: "Product" };
    else if (req.params.storeId)
      filter = { reference: req.params.storeId, onModel: "Store" };

    const features = new ApiFeatures(Rating.find(filter), req.query)
      .filter()
      .search()
      .paginate();
    const ratings = await features.query;
    res.status(200).json({
      status: "success",
      length: ratings.length,
      data: ratings,
    });
  });
  getRatingById = catchAsync(async (req, res, next) => {
    const ratings = await Rating.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: ratings,
    });
  });
  updateRating = catchAsync(async (req, res, next) => {
    const checkUser = await Rating.findById(req.params.id);
    if (checkUser.user._id.toString() === req.user.id) {
      const rating = await Rating.findOneAndUpdate(
        { _id: req.params.id },
        {
          content: req.body.content,
          number: req.body.number,
          //image:
        },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        data: rating,
      });
    } else {
      return next(
        new appError("You don't have permission to update this rating"),
        403
      );
    }
  });

  deleteRating = catchAsync(async (req, res, next) => {
    const checkUser = await Rating.findById(req.params.id);
    if (checkUser.user._id.toString() === req.user.id) {
      await Rating.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: "success",
      });
    } else {
      return next(
        new appError("You don't have permission to delete this rating"),
        403
      );
    }
  });
}

module.exports = new ratingController();
