const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reviewSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    referenceId: {
      type: Schema.Types.ObjectId,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    rate: {
      type: Number,
      required: true,
      defaultValue: 0,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["store", "product", "shipper"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
