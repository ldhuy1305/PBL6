var express = require("express");
var router = express.Router();
const storeController = require("../controllers/storeController");
const authController = require("../controllers/authController");

router.get("/:id", storeController.getStoreById);
router.get("/", storeController.getAllStore);
router.put("/:id", storeController.updateStore);
router.patch("/lock/:id", storeController.lockStore);
//Stat
router.get("/stat/category/:id", storeController.mostCategory);
router.get("/stat/order/:id", storeController.order);
router.get("/stat/cus-quantity/:id", storeController.cusQuantity);
router.get("/stat/inc-cus/:id", storeController.increaseCus);
router.get("/stat/cus-quantity-vip/:id", storeController.cusQuantityVip);
// Order
router.get("/order/:storeId", storeController.getAllOrder);
router.get("/order/:storeId/:userId", storeController.viewOrder);
router.delete("/order/:storeId/:userId", storeController.rejectOrder);
router.post("/order/:storeId/:userId", storeController.acceptOrder);

module.exports = router;
