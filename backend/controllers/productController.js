const Product = require("../models/product");
const Store = require("../models/store");
const catchAsync = require("../utils/catchAsync");
const Category = require("../models/category");
const handleController = require("./handleController");
const ApiFeatures = require("../utils/ApiFeatures");
const appError = require("../utils/appError");
const fileUploader = require("../utils/uploadImage");
const cloudinary = require("cloudinary").v2;
class ProductController {
  // View All Product by Store
  getAllProductByStore = catchAsync(async (req, res, next) => {
    const store = await Store.findOne({ ownerId: req.params.ownerId });
    const features = new ApiFeatures(
      Product.find({ storeId: store._id }),
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
    try {
      const store = await Store.findOne({ ownerId: req.params.ownerId });
      req.body.storeId = store._id;
      let cat = await Category.findOne({ catName: req.body.catName });
      if (!cat) return next(new appError("Không tìm thấy tên danh mục", 404));
      req.body.category = cat;
      let body = {
        ...req.body,
        images: req.files.map((image) => image.path),
      };
      const product = await Product.create(body);
      res.status(201).json({
        status: "success",
        data: {
          data: product,
        },
      });
    } catch (err) {
      if (req.files) {
        req.files.forEach((file) => cloudinary.uploader.destroy(file.filename));
      }
      next(err);
    }
  });
  viewProduct = handleController.getOne(Product);
  deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    if (!product) {
      return next(new appError("Không thể tìm thấy sản phẩm", 404));
    }
    product.images.forEach((links) => {
      let parts = links.split("/");
      let id =
        parts.slice(parts.length - 2, parts.length - 1).join("/") +
        "/" +
        parts[parts.length - 1].split(".")[0];
      cloudinary.uploader.destroy(id);
    });

    res.status(201).json("Đã xoá thành công");
  });
  updateProduct = catchAsync(async (req, res, next) => {
    let cat = await Category.findOne({
      catName: req.body.catName,
    });
    if (cat) cat = await Category.create({ catName: req.body.catName });
    req.body.category = cat;
    let body = {
      ...req.body,
      images: req.files.map((image) => image.path),
    };
    const product = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      body,
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
      length: products.length,
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
  uploadProductImages = fileUploader.array("images", 10);
}

module.exports = new ProductController();
