const Store = require("../models/store");
const Order = require("../models/order");
const handleController = require("./handleController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const Owner = require("../models/owner");
const fileUploader = require("../utils/uploadImage");
const appError = require("../utils/appError");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const moment = require("moment");
exports.createOwner = authController.signUp(Owner, "Owner");
exports.verifiedSignUp = authController.verifiedSignUp(Owner);
exports.uploadOwnerImages = fileUploader.fields([
  { name: "frontImageCCCD", maxCount: 1 },
  { name: "behindImageCCCD", maxCount: 1 },
]);
exports.getOrdersDaily = catchAsync(async (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";
  const now = moment().format("YYYY-MM-DD");
  const lastWeek = moment().subtract(req.query.limit || 5, "days");
  const daily = [];
  while (lastWeek.isSameOrBefore(now, "day")) {
    const count = await this.getOrderOneDate(lastWeek.toDate());
    daily.push({ date: lastWeek.format("YYYY-MM-DD"), count });
    lastWeek.add(1, "day");
  }
  res.status(200).json({
    status: "success",
    length: daily,
  });
});
exports.getOrdersWeekly = catchAsync(async (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const now = moment().endOf("week");
  const last = moment()
    .subtract(req.query.limit || 5, "weeks")
    .endOf("week");

  const weekly = [];
  let currentWeek = moment(last);

  while (currentWeek.isSameOrBefore(now, "week")) {
    const count = await this.getOrderOneWeek(currentWeek.toDate());
    weekly.push({ week: currentWeek.format("YYYY-MM-DD"), count });
    currentWeek.add(1, "week");
  }

  res.status(200).json({
    status: "success",
    weekly,
  });
});
exports.getOrdersMonthly = catchAsync(async (req, res, next) => {
  process.env.TZ = "Asia/Ho_Chi_Minh";

  const now = moment().startOf("month");
  const last = moment()
    .subtract(req.query.limit || 5, "months")
    .startOf("month");

  const monthly = [];
  let currentMonth = moment(last);

  while (currentMonth.isSameOrBefore(now, "month")) {
    const count = await this.getOrderOneMonth(currentMonth.toDate());
    monthly.push({
      month: currentMonth.endOf("month").format("YYYY-MM-DD"),
      count,
    });
    currentMonth.add(1, "month");
  }
  res.status(200).json({
    status: "success",
    monthly,
  });
});
exports.getInfoChart = catchAsync(async (req, res, next) => {
  const store = await Store.findOne({ ownerId: req.params.id });
  if (!store) return next(appError("Không tìm thấy cửa hàng", 404));
  const products = await Order.aggregate([
    {
      $match: {
        store: mongoose.Types.ObjectId(store._id),
      },
    },
    {
      $project: {
        status: 1,
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  if (!products) return next(appError("Không tìm thấy sản phẩm", 404));
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});
exports.getBestSeller = catchAsync(async (req, res, next) => {
  const store = await Store.findOne({ ownerId: req.params.id });
  if (!store) return next(appError("Không tìm thấy cửa hàng", 404));
  const products = await Order.aggregate([
    {
      $match: {
        store: mongoose.Types.ObjectId(store._id),
        status: req.query.status || "Finished",
      },
    },
    {
      $unwind: {
        path: "$cart",
      },
    },
    {
      $project: {
        product: "$cart.product",
      },
    },
    {
      $group: {
        _id: "$product",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "_id",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
      },
    },
    {
      $project: {
        _id: 0,
        product: "$product.name",
        price: "$product.price",
        images: "$product.images",
        count: 1,
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: req.query.limit || 5,
    },
  ]);
  if (!products) return next(appError("Không tìm thấy sản phẩm", 404));
  res.status(200).json({
    status: "success",
    length: products.length,
    data: products,
  });
});
exports.getOrderOneDate = async function(date) {
  const data = await Order.find({
    dateOrdered: {
      $gte: date,
      $lte: moment(date)
        .add(1, "day")
        .toDate(),
    },
  });
  console.log(date);
  return data.length;
};
exports.getOrderOneWeek = async function(date) {
  const startOfWeek = moment(date)
    .startOf("week")
    .toDate();
  const endOfWeek = moment(date)
    .endOf("week")
    .toDate();

  const data = await Order.find({
    dateOrdered: {
      $gte: startOfWeek,
      $lt: endOfWeek,
    },
  });
  return data.length;
};
exports.getOrderOneMonth = async function(date) {
  const firstDayOfMonth = moment(date)
    .startOf("month")
    .toDate();
  const lastDayOfMonth = moment(date)
    .endOf("month")
    .toDate();

  const data = await Order.find({
    dateOrdered: {
      $gte: firstDayOfMonth,
      $lt: lastDayOfMonth,
    },
  });
  return data.length;
};
