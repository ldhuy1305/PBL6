const Rating = require("../models/rating");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");

class ratingController {
  uploadRatingImages = fileUploader.fields({ name: "image", maxCount: 1 });
  updatePhoto = fileUploader.single("image");
  ratingForProduct = catchAsync(async (req, res, next) => {
    let body = {
      ...req.body,
      referenceId: req.params.productId,
      userId: req.params.userID,
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
  ratingForShipper = catchAsync(async (req, res, next) => {
    let body = {
      ...req.body,
      referenceId: req.params.shipperId,
      userId: req.params.userID,
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
  ratingForStore = catchAsync(async (req, res, next) => {
    let body = {
      ...req.body,
      referenceId: req.params.storeId,
      userId: req.params.userID,
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
}

module.exports = new ratingController();
