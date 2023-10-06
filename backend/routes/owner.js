var express = require("express");
var router = express.Router();
const storeController = require("../controllers/storeController");
router.get("/:id", storeController.getStoreById);
router.get("/", storeController.getAllStore);
router.put("/:id", storeController.updateStore);
router.delete("/:id", storeController.deleteStore);
module.exports = router;
