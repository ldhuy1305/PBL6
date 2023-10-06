const Store = require("../models/stores");
const handleController = require("./handleController");
const authController = require("../models/authController");

exports.createStore = authController.signUp(Store, "Owner");
