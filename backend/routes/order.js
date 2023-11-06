var express = require("express");
var router = express.Router();
const orderController = require("../controllers/orderController");
router.post("/user/:userId/store/:storeId", orderController.placeOrder);
router.get("/:id", orderController.viewOrder);
module.exports = router;
