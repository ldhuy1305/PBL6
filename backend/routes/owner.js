var express = require("express");
var router = express.Router();
const ownerController = require("../controllers/ownerController");
const authController = require("../controllers/authController");
const fileUploader = require("../utils/uploadImage");
// router.get("/:id", storeController.getStoreById);
// router.get("/", storeController.getAllStore);
// router.put("/:id", storeController.updateStore);
// router.delete("/:id", storeController.deleteStore);
router
  .route("/")
  .post(
    ownerController.uploadOwnerImages,
    ownerController.createOwner,
    ownerController.createStore,
    authController.sendEmailVerify
  );
router.post("/:email", ownerController.verifiedSignUp);

module.exports = router;
