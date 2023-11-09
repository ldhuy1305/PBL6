const Shipper = require("../models/shipper");
const Owner = require("../models/owner");
const Store = require("../models/store");
const User = require("../models/userModel");
const ApiFeatures = require("../utils/ApiFeatures");
const appError = require("../utils/appError");
const Email = require("../utils/email");
const catchAsync = require("../utils/catchAsync");
class adminController {
  getListAllAdmin = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(User.find({ role: "Admin" }), req.query)
      .filter()
      .search()
      .paginate();
    const admins = await features.query;
    res.status(200).json({
      status: "success",
      length: admins.length,
      data: admins,
    });
  });
  getListShipperAppove = catchAsync(async (req, res, next) => {
    const shippers = await Shipper.find({
      isAccepted: false,
      isVerified: true,
    });
    if (shippers === 0) {
      return next(
        new appError("Không có người giao hàng nào cần phê duyệt", 400)
      );
    }
    return res.status(200).json({
      length: shippers.length,
      data: shippers,
    });
  });
  getListOwnerAppove = catchAsync(async (req, res, next) => {
    const owners = await Owner.find({
      isAccepted: false,
      isVerified: true,
    });
    const ownersId = owners.map((owner) => owner._id);
    const data = await Store.find({ ownerId: { $in: ownersId } }).populate(
      "ownerId"
    );
    if (owners.length === 0) {
      return next(new appError("Không có chủ cửa hàng nào cần phê duyệt", 400));
    }
    return res.status(200).json({
      length: owners.length,
      data,
    });
  });
  appoveShipperAccount = catchAsync(async (req, res, next) => {
    const isAccepted = req.body.isAccepted;
    const shipper = await Shipper.findById({ _id: req.params.id }).select(
      "+isAccepted"
    );

    if (!shipper || !isAccepted) {
      return next(new appError("Không tìm thấy người giao hàng !!!", 500));
    }
    if (shipper.isAccepted === true) {
      return next(
        new appError("Người giao hàng này đã được duyệt rồi !!!"),
        500
      );
    }
    if (isAccepted === true) {
      try {
        const url = `${req.protocol}://${req.get("host")}/`;
        shipper.isAccepted = true;
        shipper.status = "Không hoạt động";
        await shipper.save({ validateBeforeSave: false });
        await new Email(shipper, null, url).sendAcceptEmail();
        res.status(200).json({
          message: "Xác nhận đăng ký thành công !!!",
        });
      } catch (err) {
        return next(
          new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
          500
        );
      }
    } else {
      try {
        await Shipper.findByIdAndDelete({ _id: req.params.id });
        await new Email(data, null, null).sendRefuseEmail();
        res.status(200).json({
          message: "Xác nhận đăng ký thất bại !",
        });
      } catch (err) {
        return next(
          new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
          500
        );
      }
    }
  });
  appoveOwnerAccount = catchAsync(async (req, res, next) => {
    const isAccepted = req.body.isAccepted;
    const owner = await Owner.findById({ _id: req.params.id });
    if (!owner || !isAccepted) {
      return next(new appError("Không tìm thấy chủ cửa hàng !!!", 500));
    }
    if (isAccepted === true) {
      try {
        const url = `${req.protocol}://${req.get("host")}/`;
        owner.isAccepted = true;
        await owner.save({ validateBeforeSave: false });
        await new Email(owner, null, url).sendAcceptEmail();
        res.status(200).json({
          message: "Xác nhận đăng ký thành công !!!",
        });
      } catch (err) {
        owner.isAccepted = false;
        await owner.save({ validateBeforeSave: false });
        return next(
          new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
          500
        );
      }
    } else {
      try {
        await Owner.findByIdAndDelete({ _id: req.params.id });
        await new Email(doc, null).sendRefuseEmail();
        res.status(200).json({
          message: "Xác nhận đăng ký thất bại !!!",
        });
      } catch (err) {
        return next(
          new appError("Đã xuất hiện lỗi gửi email. Vui lòng thử lại!"),
          500
        );
      }
    }
  });
}
module.exports = new adminController();
