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
// router.post("/:id/checkout", orderController.checkout);
// router.post("/:id/refund", orderController.refundOrder);
router.post("/cancel-order", orderController.cancelOrderWhenTimeOut);
module.exports = router;
