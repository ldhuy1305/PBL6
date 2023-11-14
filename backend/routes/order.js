var express = require("express");
var router = express.Router();
const orderController = require("../controllers/orderController");
const authController = require("../controllers/authController");
router.get("/after-checkout/payment", orderController.payment);
router.use(authController.protect);
router.post(
  "/user/:userId/store/:storeId",
  authController.restrict("User"),
  orderController.placeOrder
);
router.get(
  "/:id",
  authController.restrict("Owner", "Shipper", "User"),
  orderController.viewOrder
);
router.get(
  "/owner/:ownerId",
  authController.restrict("Owner"),
  orderController.cancelOrderWhenTimeOut,
  orderController.getOrdersByOwnerId
);
router.get(
  "/user/:userId",
  authController.restrict("User"),
  orderController.cancelOrderWhenTimeOut,
  orderController.getOrdersByUserId
);
module.exports = router;
