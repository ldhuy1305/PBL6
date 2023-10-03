const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.User;
const shipperSchema = new Schema({
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
});
shipperSchema.add(User.Schema);

module.exports = mongoose.model("Shipper", shipperSchema);
