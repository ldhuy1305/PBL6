var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.route("/").get(productController.viewProductsByCat);
router.route("/search").get(productController.searchProduct);
router.route("/recommend").get(productController.recommendProduct);
router
  .route("/store/:storeId")
  .get(productController.getAllProductByStore)
  .post(productController.addProduct);
router
  .route("/:id")
  .get(productController.viewProduct)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);

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
router.get("/product-by-cat/:storeId", productController.getProductByCat);
module.exports = router;
