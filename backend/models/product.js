const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
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
    ratingsAverage: {
      type: Number,
      default: 5.0,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("ratings", {
  ref: "Rating",
  foreignField: "reference",
  localField: "_id",
});

module.exports = mongoose.model("Product", productSchema);
