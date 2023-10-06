var express = require("express");
var router = express.Router();
const storeController = require("../controllers/storeController");
const authController = require("../controllers/authController");

router.post("/forgot-password", storeController.forgotPassword);
router.post("/reset-password/:id", storeController.resetPassword);
router.post(
  "/",
  storeController.createOwner,
  storeController.createStore,
  authController.sendEmailVerify
);
router.post("/:id", storeController.verifiedSignUp);

// router.get('/:id', storeController.detail);
// router.get('/', storeController.show);
// router.put('/:id', storeController.update);
// router.delete('/:id', storeController.delete);
module.exports = router;
