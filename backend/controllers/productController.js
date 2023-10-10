const Product = require("../models/product");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/category");
const handleController = require("./handleController");
class ProductController {
  // get All Product by Store
  getAllProductByStore = catchAsync(async (req, res, next) => {
    const products = await Product.find({ storeId: req.params.storeId });
    res.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  });
  // add Product to Store
  addProduct = catchAsync(async (req, res, next) => {
    req.body.storeId = req.params.storeId;
    let cat = await Category.findOne({
      catName: req.body.catName,
    });
    if (cat == null) cat = await Category.create({ catName: req.body.catName });
    req.body.category = cat;
    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: product,
      },
    });
  });
  viewProduct = handleController.getOne(Product);
  deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!product) {
      return next(new AppError("Couldn't find this document", 404));
    }
    res.status(201).json("Delete successfully");
  });
  updateProduct = catchAsync(async (req, res, next) => {
    let cat = await Category.findOne({
      catName: req.body.catName,
    });
    if (cat == null) cat = await Category.create({ catName: req.body.catName });
    req.body.category = cat;
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        data: product,
      },
    });
  });
  // Favor Product
  favorProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    console.log(product);
    product.isFavoured = !product.isFavoured;
    await product.save();
    res.status(200).json({
      status: "success",
      data: {
        data: product,
      },
    });
  });
  // View Products by Category
  viewProductsByCat = catchAsync(async (req, res, next) => {
    const products = await Product.find({
      "category.catName": req.query.catName,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  });
  // Count product by storeId
  productQuantity = catchAsync(async (req, res, next) => {
    const products = await Product.find({ storeId: req.params.storeId });
    res.status(200).json({
      status: "success",
      data: {
        data: products.length,
      },
    });
  });
  // Count non-sale product by Id
  noSaleProductQuantity = catchAsync(async (req, res, next) => {});

  // Favorite product by storesId
  favorProductQuantity = catchAsync(async (req, res, next) => {
    const products = await Product.find({
      storeId: req.params.storeId,
      isFavoured: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: products.length,
      },
    });
  });
}

module.exports = new ProductController();
