const Store = require("../models/store");
const handleController = require("./handleController");
const authController = require("../controllers/authController");
const catchAsync = require("../utils/catchAsync");
const Owner = require("../models/owner");

exports.createOwner = authController.signUp(Owner, "Owner");
exports.verifiedSignUp = authController.verifiedSignUp(Owner);
exports.createStore = catchAsync(async (req, res, next) => {
  const body = { ...req.body, ownerId: req.doc._id };
  const storeCreated = await Store.create(body);
  res.store = storeCreated;
  next();
});
