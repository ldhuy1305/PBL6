const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ratingSchema = new Schema(
  {
    reference: {
      type: Schema.Types.ObjectId,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    number: {
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
    // type: {
    //   type: String,
    //   required: true,
    //   enum: ["store", "product", "shipper"],
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Rating", ratingSchema);
