const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  category: {
    name: {
      type: String,
      required: true,
    },
  },
  store_id: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  ratingAverage: {
    type: Number,
    required: true,
    default: 0,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
