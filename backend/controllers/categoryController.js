const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");
const Category = require("../models/category");
const Product = require("../models/product");
const fileUploader = require("../utils/uploadImage");

class categoryController {
  getAllCategory = handleController.getAll(Category);
  addCategory = catchAsync(async (req, res, next) => {
    const body = { catName: req.body.catName, photo: req.file?.photo };
    try {
      const doc = await Category.create(body);
      console.log(doc);
      res.status(200).json({
        data: doc,
      });
    } catch (err) {
      if (req.file) {
        cloudinary.uploader.destroy(req.file.filename);
      }
      next(err);
    }
  });
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
  uploadCategoryImage = fileUploader.single("photo");
}

module.exports = new categoryController();
