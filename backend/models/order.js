const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    shipper: {
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
        "Pending", // when user order
        "Preparing", // when shipper accept order
        "Ready", // when shipper take order
        "Delivering", // when shipper delivery order
        "Finished", // when shipper deliveried
        "Cancelled", // when user want to cancel order
        "Refused", // when don't find shipper
      ],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
    },
    dateOrdered: {
      type: Date,
    },
    storeLocation: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
  },
  {
    timestamps: true,
  }
);
orderSchema.pre("save", async function(next) {
  const store = await mongoose.model("Store").findById(this.store);
  this.storeLocation = {
    type: "Point",
    coordinates: [...store.location.coordinates].reverse(),
  };
  next();
});
orderSchema.index({ storeLocation: "2dsphere" });
module.exports = mongoose.model("Order", orderSchema);
