const Product = require("../models/product");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/category");
const handleController = require("./handleController");
const ApiFeatures = require("../utils/ApiFeatures");
const appError = require("../utils/appError");
class ProductController {
  // get All Product by Store
  getAllProductByStore = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(
      Product.find({ storeId: req.params.storeId }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const products = await features.query;
    res.status(200).json({
      status: "success",
      length: products.length,
      data: {
        data: products,
      },
    });
  });
  // add Product to Store
  addProduct = catchAsync(async (req, res, next) => {
    req.body.storeId = req.params.storeId;
    const catName = req.body.catName;
    let cat = await Category.findOne({ catName });
    if (!cat) next(new appError("Không tìm thấy tên danh mục", 404));
    product = await Product.create(req.body);
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
      return next(new appError("Không thể tìm thấy sản phẩm", 404));
    }
    res.status(201).json("Đã xoá thành công");
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
    const totalProducts = await Product.countDocuments({
      storeId: req.params.storeId,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: totalProducts,
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
  searchProduct = catchAsync(async (req, res, next) => {
    const products = await Product.find({
      name: { $regex: req.query.search, $options: "i" },
    }).sort("-ratingAverage");
    res.status(200).json({
      status: "success",
      data: {
        data: products,
      },
    });
  });
  recommendProduct = catchAsync(async (req, res, next) => {});
  getProductByCat = catchAsync(async (req, res, next) => {
    const storeId = req.params.storeId;
    const products = await Product.find({ storeId: storeId }).aggregate([
      // { $unwind: "$category" },
      {
        $group: {
          _id: null,
          // name: "$category",
          productCount: { $sum: 1 },
          // productName: { $push: "$name" },
        },
      },
    ]);
    res.status(200).json({
      status: "success",
      length: products.length,
      data: {
        data: products,
      },
    });
  });
}

module.exports = new ProductController();
