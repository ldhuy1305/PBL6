const mongoose = require("mongoose");
const User = require("./User");
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
  },
  behindImageCCCD: {
    type: String,
    required: true,
  },
  registrationLicense: {
    type: String,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
  },
});

const Owner = User.discriminator("Owner", ownerSchema);

module.exports = Owner;
