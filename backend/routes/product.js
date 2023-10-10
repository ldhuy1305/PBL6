var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.route("/").get(productController.viewProductsByCat);
router
  .route("/store/:storeId")
  .get(productController.getAllProductByStore)
  .post(productController.addProduct);
router
  .route("/:id")
  .get(productController.viewProduct)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct)
  .patch(productController.favorProduct);

router.get(
  "/stat/favor-product/:storeId",
  productController.favorProductQuantity
);
router.get(
  "/stat/no-sale-product/:storeId",
  productController.noSaleProductQuantity
);
router.get(
  "/stat/product-quantity/:storeId",
  productController.productQuantity
);
module.exports = router;
