const Contact = require("../models/contact");
const Order = require("../models/order");
const Store = require("../models/store");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const mapUtils = require("../utils/mapUtils");
const appError = require("../utils/appError");
class orderController {
  placeOrder = catchAsync(async (req, res, next) => {
    const { userId, storeId } = req.params;
    const { shipCost, cart, totalPrice } = req.body;
    const order = await Order.create({
      userId,
      storeId,
      cart,
      totalPrice,
      shipCost,
      dateOrdered: new Date(Date.now() + 7 * 60 * 60 * 1000),
    });
    res.status(200).json({
      status: "success",
      data: order,
    });
  });
  viewOrder = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new appError("Không tìm thấy đơn hàng"), 404);
    res.status(200).json({
      status: "success",
      data: order,
    });
  });
}

module.exports = new orderController();
