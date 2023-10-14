const Favourite = require("../models/favourite");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
class FavouriteController {
  // Favour product
  favourProduct = catchAsync(async (req, res, next) => {
    const { userId, productId } = req.params;
    const favourite = await Favourite.findOneAndDelete({ userId, productId });
    if (favourite) {
      res.status(200).json({
        status: "success",
        message: "Deleted successfully",
      });
    } else {
      const favorite = await Favourite.create({
        userId: userId,
        productId: productId,
      });
      res.status(201).json({
        status: "success",
        data: {
          data: favorite,
        },
      });
    }
  });
  // get favorite products by userId
  getFavouritesByUserId = catchAsync(async (req, res, next) => {
    const userId = req.params.userId;
    const favorite = await Favourite.find({ userId }).select("-__v -_id");
    if (!favorite)
      return next(new AppError("Couldn't find this document", 404));
    res.status(200).json({
      status: "success",
      length: favorite.length,
      data: {
        data: favorite,
      },
    });
  });
  // get favorite products by productId
  getFavouritesByProductId = catchAsync(async (req, res, next) => {
    const productId = req.params.productId;
    const favorite = await Favourite.find({ productId }).select("-__v -_id ");
    if (!favorite)
      return next(new AppError("Couldn't find this document", 404));
    res.status(200).json({
      status: "success",
      length: favorite.length,
      data: {
        data: favorite,
      },
    });
  });
}

module.exports = new FavouriteController();
