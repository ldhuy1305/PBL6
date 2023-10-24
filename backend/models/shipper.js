const mongoose = require("mongoose");
const User = require("./userModel");

const shipperSchema = new mongoose.Schema({
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  phoneNumber: {
    type: String,
    trim: true,
    validate: {
      validator: (value) => {
        return /^[0-9]{10}$/.test(value);
      },
      message: (problem) => `${problem.value} is not a valid last name`,
    },
  },
  frontImageCCCD: {
    type: String,
    required: [true, "Phía trước CCCD là bắt buộc"],
    select: false,
  },
  behindImageCCCD: {
    type: String,
    required: [true, "Phía sau CCCD là bắt buộc"],
    select: false,
  },
  status: {
    type: String,
    enum: ["Đang rảnh", "Đang giao hàng"],
    default: "Đang rảnh",
  },
  location: {
    type: String,
  },
  //GPLX
  licenseNumber: {
    type: String,
    required: [true, "Mã giấy phép lái xe là bắt buộc"],
  },
  licenseImage: {
    type: String,
    required: [true, "Hình ảnh giấy phép lái xe là bắt buộc"],
    select: false,
  },
  //vehicle
  vehicleNumber: {
    type: String,
    required: [true, "Biển số xe là bắt buộc"],
  },
  vehicleType: {
    type: String,
    required: [true, "Loại xe là bắt buộc"],
  },
  vehicleLicense: {
    type: String,
    require: [true, "Giấy tờ xe là bắt buộc"],
  },
  isAccepted: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const Shipper = User.discriminator("Shipper", shipperSchema);

module.exports = Shipper;
