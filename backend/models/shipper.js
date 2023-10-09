const mongoose = require("mongoose");
const User = require("./User");

const shipperSchema = new mongoose.Schema({
  ratingAverage: {
    type: Number,
    default: 0,
  },
  frontImageCCCD: {
    type: String,
    required: true,
  },
  behindImageCCCD: {
    type: String,
    required: true,
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
  licenseId: {
    type: String,
    required: true,
  },
  licenseImage: {
    type: String,
    required: true,
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
  },
});

const Shipper = User.discriminator("Shipper", shipperSchema);

module.exports = Shipper;
