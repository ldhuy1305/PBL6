const mongoose = require("mongoose");
const User = require("./userModel");
const ownerSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
  },
  bankNumber: {
    type: String,
    required: true,
  },
  frontImageCCCD: {
    type: String,
    required: true,
    select: false,
  },
  behindImageCCCD: {
    type: String,
    required: true,
    select: false,
  },
  registrationLicense: {
    type: String,
    required: true,
    select: false,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const Owner = User.discriminator("Owner", ownerSchema);

module.exports = Owner;
