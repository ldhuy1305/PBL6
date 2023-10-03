const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
    },
    role: {
      type: String,
      trim: true,
      enum: ["User", "Admin", "Shipper", "Owner"],
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      validate: {
        validator: (value) => {
          return /^([\w-.]{3,})+@([\w-.]{3,15})+.([a-zA-Z]{2,3})$/.test(value);
        },
        message: (problem) => `${problem.value} is not valid`,
      },
    },
    firstName: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      validate: {
        validator: (value) => {
          return /^[a-zA-Z]{2,15}$/.test(value);
        },
        message: (problem) => `${problem.value} is not a valid first name`,
      },
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      validate: {
        validator: (value) => {
          return /^[a-zA-Z]{2,15}$/.test(value);
        },
        message: (problem) => `${problem.value} is not a valid last name`,
      },
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      minLength: 7,
    },
    phoneNumber: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          return /^[0-9]{10}$/.test(value);
        },
        message: (problem) => `${problem.value} is not a valid last name`,
      },
    },
    address: {
      type: String,
      trim: true,
    },
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
