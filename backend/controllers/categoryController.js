const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");
const Category = require("../models/category");
const Product = require("../models/product");

class categoryController {
  getAllCategory = handleController.getAll(Category);
  addCategory = handleController.postOne(Category);
  // Get all categories by Store
  getAllCategoryByStore = catchAsync(async (req, res, next) => {
    const products = await Product.find({ storeId: req.params.id });
    const catNames = [
      ...new Set(products.map((product) => product.category.catName)),
    ];
    const categories = await Category.find({ catName: { $in: catNames } });

    res.status(200).json({
      status: "success",
      data: categories,
    });
  });
}

module.exports = new categoryController();
