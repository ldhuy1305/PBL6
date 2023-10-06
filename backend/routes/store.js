var express = require("express");
var router = express.Router();
const storeController = require("../controllers/storeController");
const productController = require("../controllers/productController");
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
router.get("/stat/product-quantity/:id", storeController.productQuantity);
router.get("/stat/favor-product/:id", storeController.favorProductQuantity);
router.get("/stat/no-sale-product/:id", storeController.noSaleProductQuantity);
// Order
router.get("/:storeId/allOrder", storeController.getAllOrder);
router.get("/:storeId/:userId", storeController.viewOrder);
router.delete("/:storeId/:userId", storeController.rejectOrder);
router.post("/:storeId/:userId", storeController.acceptOrder);
//Product
router.get("/product/:storeId", (req, res) => {
  res.json(req.params);
});
router.get("/product/:storeId", storeController.getAllProduct);
// router.post("/product/:storeId", storeController.addProduct);
router.get("/product/:storeId/:productId", storeController.viewProduct);
router.delete("/product/:storeId/:productId", storeController.deleteProduct);
router.put("/product/:storeId/:productId", storeController.updateProduct);
module.exports = router;
