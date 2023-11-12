const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const shipperSchema = new Schema({
  ratingAverage: {
    type: Number,
    default: 4.5,
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
    enum: [
      "Tạm Ngừng",
      "Đang giao hàng",
      "Chờ phê duyệt",
      "Không hoạt động",
      "Hoạt động",
    ],
    default: "Chờ phê duyệt",
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
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
});
const Shipper = User.discriminator("Shipper", shipperSchema);

module.exports = Shipper;
