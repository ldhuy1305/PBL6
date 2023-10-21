const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    images: {
      type: String,
      default: "",
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
module.exports = mongoose.model("Store", storeSchema);
