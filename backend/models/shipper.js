const mongoose = require("mongoose");
const User = require("./userModel");

const shipperSchema = new mongoose.Schema({
  ratingAverage: {
    type: Number,
    default: 4.5,
  },
  frontImageCCCD: {
    type: String,
    required: true,
    select: false,
  },
  behindImageCCCD: {
    type: String,
    required: true,
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
    required: true,
  },
  licenseImage: {
    type: String,
    required: true,
    select: false,
  },
  //vehicle
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  vehicleLicense: {
    type: String,
    require: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const Shipper = User.discriminator("Shipper", shipperSchema);

module.exports = Shipper;
