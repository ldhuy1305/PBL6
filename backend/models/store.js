const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
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
      type: Date,
      required: [true, "Store opening time is required"],
    },
    closeAt: {
      type: Date,
      required: [true, "Store closing time is required"],
    },
    description: {
      type: String,
      trim: true,
    },
    ratingAverage: {
      type: Number,
      default: 0,
    },
    images: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Store", storeSchema);
