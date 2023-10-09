var express = require("express");
var router = express.Router();
const ownerController = require("../controllers/ownerController");
const authController = require("../controllers/authController");
// router.get("/:id", storeController.getStoreById);
// router.get("/", storeController.getAllStore);
// router.put("/:id", storeController.updateStore);
// router.delete("/:id", storeController.deleteStore);
router.route("/forgot-password").post(ownerController.forgotPassword);
router.route("/reset-password/:id").post(ownerController.resetPassword);
router
  .route("/")
  .post(
    ownerController.createOwner,
    ownerController.createStore,
    authController.sendEmailVerify
  );
router.post("/:id", ownerController.verifiedSignUp);

module.exports = router;
