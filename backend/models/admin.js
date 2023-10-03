const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = mongoose.User;
const adminSchema = new Schema({});
adminSchema.add(User.Schema);

module.exports = mongoose.model("Admin", adminSchema);
