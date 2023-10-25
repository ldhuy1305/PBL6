const Store = require("../models/store");
const Product = require("../models/product");
const Owner = require("../models/owner");
const Category = require("../models/category");
const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");
const appError = require("../utils/appError");
const ApiFeatures = require("../utils/ApiFeatures");
class storeController {
  getStoreById = catchAsync(async (req, res, next) => {
    const store = await Store.findOne({ ownerId: req.params.ownerId });
    if (!store) next(new appError("Không tìm thấy cửa hàng", 404));
    res.status(200).json({
      status: "success",
      data: store,
    });
  });
  getAllStore = catchAsync(async (req, res, next) => {
    let stores;
    let obj = {
      isLocked: req.query.isLocked,
      address: new RegExp(req.query.address, "i"),
    };
    if (req.query.name)
      obj = {
        ...obj,
        name: req.query.name,
      };
    if (req.query.catName) {
      const products = await Product.find({
        "category.catName": req.query.catName,
      });

      let storeIds = new Set();
      for (let i = 0; i < products.length; i++)
        storeIds.add(String(products[i].storeId));
      storeIds = [...storeIds];
      obj = {
        ...obj,
        _id: { $in: storeIds },
      };
    }
    const features = new ApiFeatures(Store.find(obj), req.query)
      .limitFields()
      .paginate();
    stores = await features.query;
    res.status(200).json({
      status: "success",
      length: stores.length,
      data: stores,
    });
  });
  updateStore = catchAsync(async (req, res, next) => {
    const store = await Store.findOneAndUpdate(
      { ownerId: req.params.ownerId },
      req.body
    );
    if (!store) next(new appError("Không tìm thấy cửa hàng", 404));
    res.status(200).json({
      status: "success",
      data: store,
    });
  });
  lockStore = catchAsync(async (req, res, next) => {
    let store = await Store.findOne({ ownerId: req.params.ownerId });
    store.isLocked = !store.isLocked;
    await store.save();
    res.status(200).json({
      status: "success",
      data: store,
    });
  });
  // View Store in City
  getStoreByCity = catchAsync(async (req, res, next) => {
    console.log(123);
    const stores = await Store.find({
      address: new RegExp(req.params.name, "i"),
    });
    res.status(200).json({
      status: "success",
      length: stores.length,
      data: {
        data: stores,
      },
    });
  });
  // Stat
  mostCategory = catchAsync(async (req, res, next) => {});
  order = catchAsync(async (req, res, next) => {});
  cusQuantity = catchAsync(async (req, res, next) => {});
  increaseCus = catchAsync(async (req, res, next) => {});
  cusQuantityVip = catchAsync(async (req, res, next) => {});
  productQuantity = catchAsync(async (req, res, next) => {});
  favorProductQuantity = catchAsync(async (req, res, next) => {});
  noSaleProductQuantity = catchAsync(async (req, res, next) => {});
  // Order
  getAllOrder = catchAsync(async (req, res, next) => {});
  viewOrder = catchAsync(async (req, res, next) => {});
  rejectOrder = catchAsync(async (req, res, next) => {});
  acceptOrder = catchAsync(async (req, res, next) => {});
}

module.exports = new storeController();
