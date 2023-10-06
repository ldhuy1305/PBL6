const Product = require("../models/product");
const catchAsync = require("../utils/catchAsync");
class ProductController {
  createProduct = catchAsync(async (req, res, next) => {
    const body = req.body;
    req.body = await Product.create(body);
    next();
  });
  getAllProduct = catchAsync(async (req, res, next) => {
    req.body.Product = await Product.find();
    next();
  });
  updateProduct = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    await Product.findByIdAndUpdate(user.defaultProduct, req.body);
    next();
  });
  addProduct = catchAsync(async (req, res, next) => {
    const body = req.body;
    req.body.Product = await Product.create(body);
    next();
  });
  delProduct = catchAsync(async (req, res, next) => {
    if (req.params.ProductId == delProduct.Product)
      next(new AppError("Default Product isn't deleted", 404));
    const Product = await Product.findById(req.params.ProductId);
    Product.__v = undefined;
    req.body.Product = Product;
    await Product.findByIdAndDelete(req.params.ProductId);
    next();
  });
  delAllProduct = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    for (let i = 0; i < user.Product.length; i++) {
      await Product.findByIdAndDelete(user.contact[i]._id);
    }
    next();
  });
}

module.exports = new ProductController();
