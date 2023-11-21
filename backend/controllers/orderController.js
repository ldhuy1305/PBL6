const Contact = require("../models/contact");
const Order = require("../models/order");
const Transaction = require("../models/transaction");
const Store = require("../models/store");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const mapUtils = require("../utils/mapUtils");
const appError = require("../utils/appError");
const ApiFeatures = require("../utils/ApiFeatures");
const request = require("request");
const moment = require("moment");
const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
process.env.TZ = "Asia/Ho_Chi_Minh";
class orderController {
  placeOrder = catchAsync(async (req, res, next) => {
    const { userId, storeId } = req.params;
    const { shipCost, cart, totalPrice, coordinates } = req.body;
    const order = await Order.create({
      user: userId,
      store: storeId,
      cart,
      totalPrice,
      shipCost,
      userLocation: { type: "Point", coordinates: coordinates.reverse() },
      status: "Pending",
      dateOrdered: new Date(Date.now() + 7 * 60 * 60 * 1000),
    });
    console.log(order.userLocation);
    process.env.TZ = "Asia/Ho_Chi_Minh";

    let date = new Date();
    let createDate = moment(date).format("YYYYMMDDHHmmss");

    let env = process.env;

    let tmnCode = env.vnp_TmnCode;
    let secretKey = env.vnp_HashSecret;
    let vnpUrl = env.vnp_Url;
    let returnUrl = env.vnp_ReturnUrl;
    let ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    let currCode = "VND";
    let vnp_Params = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = order._id;
    vnp_Params["vnp_OrderInfo"] = `Thanh toan cho mã đơn hàng:${order._id}`;
    vnp_Params["vnp_OrderType"] = "billpayment";
    vnp_Params["vnp_Amount"] = order.totalPrice * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = "VNBANK";

    vnp_Params = sortObject(vnp_Params);
    let querystring = require("qs");
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.status(200).json({
      status: "success",
      data: order,
      url: vnpUrl,
    });
  });

  // after check out, system create transaction
  payment = catchAsync(async (req, res, next) => {
    const vnp_Params = req.query;
    if (req.query.vnp_TransactionStatus != "00") {
      await Order.findByIdAndDelete(req.query.vnp_TxnRef);
      return next(new appError("Thanh toán không thành công!"), 404);
    }
    await Transaction.create(vnp_Params);
    res.status(200).json({
      status: "success",
      data: vnp_Params,
    });
  });
  viewOrder = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate({
      path: "cart.product",
      select: "name",
    });
    if (!order) return next(new appError("Không tìm thấy đơn hàng"), 404);
    res.status(200).json({
      status: "success",
      data: order,
    });
  });
  // refuse order when time out
  refuseOrderWhenTimeOut = catchAsync(async (req, res, next) => {
    const orders = await Order.find();
    if (orders) {
      for (let order of orders) {
        let t = (Date.now() - order.createdAt) / 60000;
        if (order.status == "Pending" && t > 30) {
          order.status = "Refused";
          await this.refundOrder(req, order._id, next);
          await order.save();
        }
      }
    }
    next();
  });
  changeStatus = catchAsync(async (req, res, next) => {
    const { id, shipperId } = req.params;
    const order = await Order.findById(id);
    if (!order) return next(new appError("Không tìm thấy đơn hàng"), 404);
    let message;
    // when shipper accept order
    if (order.status == "Pending") {
      order.shipper = shipperId;
      order.status = "Preparing";
      message = "Shipper đã xác nhận giao hàng";
    }
    // when shipper take order
    if (order.status == "Preparing") {
      order.status = "Ready";
      message = "Shipper đã nhận hàng";
    }
    // when shipper delivery order
    if (order.status == "Ready") {
      order.status = "Delivering";
      message = "Shipper đang giao hàng";
    }
    // when shipper deliveried
    if (order.status == "Delivering") {
      order.status = "Finished";
      message = "Shipper đã giao hàng thành công";
    }
    await order.save();
    return res.status(200).json({
      success: "success",
      message,
    });
  });
  async refundOrder(req, id, next) {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    const transaction = await Transaction.findOne({
      vnp_TxnRef: `${id}`,
    });
    if (!transaction) return next(new appError("Không tìm thấy đơn hàng"), 404);
    let date = new Date();

    let vnp_TmnCode = process.env.vnp_TmnCode;
    let secretKey = process.env.vnp_HashSecret;
    let vnp_Api = process.env.vnp_Api;

    let vnp_TxnRef = transaction.vnp_TxnRef;
    let vnp_TransactionDate = transaction.vnp_PayDate;
    let vnp_Amount = transaction.vnp_Amount;
    let vnp_TransactionType = "02";
    let vnp_CreateBy = "Falth";

    let currCode = "VND";

    let vnp_RequestId = moment(date).format("HHmmss");
    let vnp_Version = "2.1.0";
    let vnp_Command = "refund";
    let vnp_OrderInfo = "Hoan tien GD ma:" + vnp_TxnRef;

    let vnp_IpAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let vnp_CreateDate = moment(date).format("YYYYMMDDHHmmss");

    let vnp_TransactionNo = "0";

    let data =
      vnp_RequestId +
      "|" +
      vnp_Version +
      "|" +
      vnp_Command +
      "|" +
      vnp_TmnCode +
      "|" +
      vnp_TransactionType +
      "|" +
      vnp_TxnRef +
      "|" +
      vnp_Amount +
      "|" +
      vnp_TransactionNo +
      "|" +
      vnp_TransactionDate +
      "|" +
      vnp_CreateBy +
      "|" +
      vnp_CreateDate +
      "|" +
      vnp_IpAddr +
      "|" +
      vnp_OrderInfo;
    let hmac = crypto.createHmac("sha512", secretKey);
    let vnp_SecureHash = hmac
      .update(new Buffer.from(data, "utf-8"))
      .digest("hex");

    let dataObj = {
      vnp_RequestId: vnp_RequestId,
      vnp_Version: vnp_Version,
      vnp_Command: vnp_Command,
      vnp_TmnCode: vnp_TmnCode,
      vnp_TransactionType: vnp_TransactionType,
      vnp_TxnRef: vnp_TxnRef,
      vnp_Amount: vnp_Amount,
      vnp_TransactionNo: vnp_TransactionNo,
      vnp_CreateBy: vnp_CreateBy,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_TransactionDate: vnp_TransactionDate,
      vnp_CreateDate: vnp_CreateDate,
      vnp_IpAddr: vnp_IpAddr,
      vnp_SecureHash: vnp_SecureHash,
    };

    request(
      {
        url: vnp_Api,
        method: "POST",
        json: true,
        body: dataObj,
      },
      function (error, response, body) {
        if (error) {
          return next(new appError("Xuất hiện lỗi hoàn tiền", 404));
        }
      }
    );
    // res.status(200).json({
    //   status: "success",
    //   data: transaction,
    // });
  }

  getOrdersByOwnerId = catchAsync(async (req, res, next) => {
    const store = await Store.findOne({ ownerId: req.params.ownerId });
    if (!store) return next(new appError("Không tìm thấy cửa hàng"), 404);
    let start, end;

    if (!req.query.start)
      start = moment().subtract(30, "days").add(7, "hours").toDate();
    else start = moment(req.query.start, "DD-MM-YYYY").add(7, "hours").toDate();

    if (!req.query.end) end = moment().add(7, "hours").toDate();
    else end = moment(req.query.end, "DD-MM-YYYY").add(31, "hours").toDate(); // 7 + 24 hours

    const features = new ApiFeatures(
      Order.find({
        store: store._id,
        status: req.query.status,
        dateOrdered: {
          $gte: start,
          $lt: end,
        },
      }).populate({
        path: "user",
        select: "-role -photo -email -contact -createdAt -updatedAt -_id -__t",
        populate: {
          path: "defaultContact",
          select: "-location -_id -__v",
        },
      }),
      req.query
    )
      .sort()
      .limitFields()
      .paginate();
    const orders = await features.query;
    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  });

  getOrdersByUserId = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) return next(new appError("Không tìm thấy người dùng"), 404);
    let start, end;

    if (!req.query.start)
      start = moment().subtract(30, "days").add(7, "hours").toDate();
    else start = moment(req.query.start, "DD-MM-YYYY").add(7, "hours").toDate();

    if (!req.query.end) end = moment().add(7, "hours").toDate();
    else end = moment(req.query.end, "DD-MM-YYYY").add(31, "hours").toDate(); // 7 + 24 hours

    const features = new ApiFeatures(
      Order.find({
        user: req.params.userId,
        status: req.query.status,
        dateOrdered: {
          $gte: start,
          $lt: end,
        },
      }).populate({
        path: "store",
        select:
          "-location -rating -isLocked -openAt -closeAt -description -ownerId -registrationLicense -image -createdAt -updatedAt -__v",
      }),
      req.query
    )
      .sort()
      .limitFields()
      .paginate();
    const orders = await features.query;
    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  });
}
function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}
module.exports = new orderController();
