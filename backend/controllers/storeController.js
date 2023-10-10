const Store = require("../models/store");
const Product = require("../models/product");
const handleController = require("./handleController");
const catchAsync = require("../utils/catchAsync");

class storeController {
  getStoreById = handleController.getOne(Store);
  getAllStore = catchAsync(async (req, res, next) => {
    let stores;
    if (req.params.isLocked == true) stores = await Store.find();
    else stores = await Store.find({ isLocked: true });
    res.status(200).json({
      status: "success",
      data: stores,
    });
  });
  updateStore = handleController.putOne(Store);
  lockStore = catchAsync(async (req, res, next) => {
    let store = await Store.findById(req.params.id);
    store.isLocked = !store.isLocked;
    await store.save();
    res.status(200).json({
      status: "success",
      data: store,
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
  // Product
  getAllProduct = catchAsync(async (req, res, next) => {});
  addProduct = catchAsync(async (req, res, next) => {
    req.body.storeId = req.params.storeId;
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: product,
      },
    });
  });
  viewProduct = catchAsync(async (req, res, next) => {});
  deleteProduct = catchAsync(async (req, res, next) => {});
  updateProduct = catchAsync(async (req, res, next) => {});
}

module.exports = new storeController();
