var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.route("/").get(productController.viewProductsByCat);
router.route("/search").get(productController.searchProduct);
router.route("/recommend").get(productController.recommendProduct);
router.route("/:id").get(productController.viewProduct);
router.use(authController.protect);
router
  .route("/store/:storeId")
  .all(authController.restrict("Owner"))
  .get(productController.getAllProductByStore)
  .post(productController.addProduct);
router
  .route("/:id")
  .all(authController.restrict("Owner"))
  .delete(productController.deleteProduct)
  .put(productController.updateProduct);

router.get(
  "/stat/favor-product/:storeId",
  authController.restrict("Owner"),
  productController.favorProductQuantity
);
router.get(
  "/stat/no-sale-product/:storeId",
  authController.restrict("Owner"),
  productController.noSaleProductQuantity
);
router.get(
  "/stat/product-quantity/:storeId",
  authController.restrict("Owner"),
  productController.productQuantity
);
router.get(
  "/product-by-cat/:storeId",
  authController.restrict("Owner"),
  productController.getProductByCat
);
module.exports = router;