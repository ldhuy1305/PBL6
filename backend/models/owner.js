const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.User;
const ownerSchema = new Schema({
  accountNumber: {
    type: String,
    required: true,
  },
  registrationLicense: {
    type: String,
    required: true,
  },
  storeID: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  isAccepted: {
    type: Boolean,
    default: false,
  },
  isLocked: {
    type: Boolean,
    default: false,
  },
});

const Owner = User.discriminator("Owner", ownerSchema);

module.exports = Owner;
