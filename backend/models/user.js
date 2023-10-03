const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    role: {
      type: String,
      trim: true,
      enum: ["User", "Admin", "Shipper", "Owner"],
      default: "User",
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
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
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
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

module.exports = mongoose.model("User", userSchema);
