const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  category: {
    catName: {
      type: String,
      required: [true, "Tên danh mục là bắt buộc"],
    },
  },
  storeId: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: true,
  },
  name: {
    type: String,
    required: [true, "Tên sản phẩm là bắt buộc"],
  },
  images: [
    {
      type: String,
      required: [true, "Hình ảnh là bắt buộc"],
    },
  ],
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
    required: [true, "Mô tả sản phẩm là bắt buộc"],
  },
  isOutofOrder: {
    type: Boolean,
    default: true,
  },
  rating: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
