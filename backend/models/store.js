const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Store name is required"],
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          return /^[0-9]{10}$/.test(value);
        },
        message: (problem) => `${problem.value} is not a valid phone number`,
      },
    },
    address: {
      type: String,
      trim: true,
      required: [true, "Store address is required"],
    },
    openAt: {
      type: String,
      required: [true, "Store opening time is required"],
    },
    closeAt: {
      type: String,
      required: [true, "Store closing time is required"],
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
