const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mapUtils = require("../utils/mapUtils");

const storeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Tên cửa hàng là bắt buộc"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          return /^[0-9]{10}$/.test(value);
        },
        message: (problem) => `${problem.value} không hợp lệ`,
      },
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Địa chỉ là bắt buộc"],
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dshpere",
      },
    },
    openAt: {
      type: String,
      required: [true, "Thời gian mở cửa là bắt buộc"],
    },
    closeAt: {
      type: String,
      required: [true, "Thời gian đóng cửa là bắt buộc"],
    },
    description: {
      type: String,
      trim: true,
    },
    registrationLicense: {
      type: String,
      required: true,
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    rating: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    image: {
      type: String,
      required: [true, "Hình ảnh cửa hàng là bắt buộc"],
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "Owner",
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

storeSchema.pre("save", async (next) => {
  const loc = await mapUtils.getGeoCode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].latitude, loc[0].longitude],
  };
  next();
});
module.exports = mongoose.model("Store", storeSchema);
