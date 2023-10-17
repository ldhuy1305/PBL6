const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    shipperId: {
      type: Schema.Types.ObjectId,
      ref: "Shipper",
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
    },
    shipCost: {
      type: Number,
      required: true,
      defaultValue: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      defaultValue: 0,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Đặt hàng thành công",
        "Chuẩn bị soạn đơn hàng",
        "Chuẩn bị giao hàng",
        "Đang giao hàng",
        "Giao hàng thành công",
      ],
    },
    time: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = mongoose.model("Order", orderSchema);
