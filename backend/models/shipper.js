const mongoose = require("mongoose");
const User = require("./userModel");

const shipperSchema = new mongoose.Schema({
  ratingAverage: {
    type: Number,
    default: 0,
  },
  identityNumber: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["Đang rảnh", "Đang giao hàng"],
    default: "Đang rảnh",
  },
  location: {
    type: String,
  },
  licensePlate: {
    type: String,
  },
  carInfo: {
    type: String,
  },
  isAccepted: {
    type: Boolean,
    default: false,
    select: false,
  },
});

const Shipper = User.discriminator("Shipper", shipperSchema);

module.exports = Shipper;
