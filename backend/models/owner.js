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
  status: {
    type: Boolean,
    default: false,
  },
});
ownerSchema.add(User.Schema);

module.exports = mongoose.model("Owner", ownerSchema);
