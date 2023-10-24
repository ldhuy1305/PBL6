const Rating = require("../models/rating");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const fileUploader = require("../utils/uploadImage");

class ratingController {
  uploadRatingImages = fileUploader.fields([{ name: "image", maxCount: 1 }]);
  ratingForProduct = catchAsync(async (req, res, next) => {
    let body = {
      ...req.body,
      referenceId: req.params.productId,
      userId: req.params.userID,
    };
    if (req.files) {
      body = {
        ...body,
        image: req.files.image[0]?.path,
      };
    }

    res.json(body);
    // const rating = await Rating.create(body);
    // if (!rating) console.log("Could");
    // res.status(201).json(rating);
  });
  ratingForShipper = catchAsync(async (req, res, next) => {});
  ratingForStore = catchAsync(async (req, res, next) => {});
}

module.exports = new ratingController();
