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
  // View All Product by OwnerID
  getAllProductByOwnerId = catchAsync(async (req, res, next) => {
    const store = await Store.findOne({ ownerId: req.params.ownerId });
    const features = new ApiFeatures(
      Product.find({ storeId: store._id }),
      req.query
    )
      .filter()
      .search()
      .sort()
      // .limitFields()
      .paginate();
    const products = await features.query;
    res.status(200).json({
      status: "success",
      length: products.length,
      data: products,
    });
  });
  // View All Product by StoreID
  getAllProductByStoreId = catchAsync(async (req, res, next) => {
    const store = await Store.findById(req.params.storeId);
    const features = new ApiFeatures(
      Product.find({ storeId: store._id }),
      req.query
    )
      .filter()
      .search()
      .sort()
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

      if (!product) return next(new appError("Không tạo được sản phẩm", 404));
      res.status(201).json({
        status: "success",
        data: product,
      });
    } catch (err) {
      if (req.files) {
        req.files.forEach((file) => cloudinary.uploader.destroy(file.filename));
      }
      next(new appError(err.message, 404));
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

    res.status(200).json("Đã xoá thành công");
  });
  updateProduct = catchAsync(async (req, res, next) => {
    let cat = await Category.findOne({
      catName: req.body.catName,
    });
    req.body.category = cat;
    let body = req.body;
    let product = await Product.findById({ _id: req.params.id });
    if (!product) return next(new appError("Không thể tìm thấy sản phẩm", 404));
    let images = [...product.images];
    let dels = req.body.dels;
    // fillter exits image
    if (req.body.dels) {
      images = images.filter((el) => !dels.includes(el));
    }
    if (req.files) {
      images = images.concat(req.files.map((image) => image.path));
      body = {
        ...body,
        images,
      };
    }
    // let dels = product.images;
    const data = await Product.findByIdAndUpdate({ _id: req.params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then()
      .catch((err) => {
        // urls = req.files.map((image) => image.path);
        next(err);
      });

    // delete images
    if (req.body.dels) {
      // let urls = [...req.body.dels];
      // console.log(urls);
      for (let i = 0; i < dels.length; i++) {
        let parts = dels[i].split("/");
        let id =
          parts.slice(parts.length - 2, parts.length - 1).join("/") +
          "/" +
          parts[parts.length - 1].split(".")[0];
        console.log(id);
        cloudinary.uploader.destroy(id);
      }
    }
    res.status(200).json({
      status: "success",
      data,
    });
  });
  // View Products by Category
  viewProductsByCat = catchAsync(async (req, res, next) => {
    const obj = {
      "category.catName": req.query.catName,
    };
    const features = new ApiFeatures(Product.find(obj), req.query)
      .sort()
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
    // const products = await Product.find({
    //   name: { $regex: req.query.search, $options: "i" },
    // }).sort("-ratingAverage");
    const products = await Product.aggregate([
      {
        $match: {
          name: { $regex: req.query.search, $options: "i" },
        },
      },
      {
        $lookup: {
          from: "stores",
          localField: "storeId",
          foreignField: "_id",
          as: "store",
        },
      },
      { $unwind: "$store" },
      {
        $project: {
          name: 1,
          ratingsAverage: 1,
          store: {
            _id: 1,
            name: 1,
            address: 1,
          },
        },
      },
      {
        $sort: { ratingsAverage: -1 },
      },
    ]);
    res.status(200).json({
      status: "success",
      data: products,
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
