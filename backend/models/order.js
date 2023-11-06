const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    shipperId: {
      type: Schema.Types.ObjectId,
      ref: "Shipper",
    },
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1,
        },
        notes: {
          type: String,
          default: undefined,
        },
        price: {
          type: Number,
          default: 0,
        },
      },
    ],
    shipCost: {
      type: Number,
      defaultValue: 0,
    },
    totalPrice: {
      type: Number,
      defaultValue: 0,
    },
    status: {
      type: String,
      enum: [
        "Đặt hàng thành công",
        "Chuẩn bị soạn đơn hàng",
        "Chuẩn bị giao hàng",
        "Đang giao hàng",
        "Giao hàng thành công",
      ],
    },
    paymentMethod: {
      type: String,
    },
    dateOrdered: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
