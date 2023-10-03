const Shipper = require("../models/shipper");
const handleController = require("./handleController");

class shipperController {
  signUpShipper = handleController.postOne(Shipper);
  getAllShipper = handleController.getAll(Shipper);
  getShipperById = handleController.getOne(Shipper);
  updateShipper = handleController.putOne(Shipper);
  deleteShipper = handleController.delOne(Shipper);
}

module.exports = new shipperController();
