var express = require("express");
var router = express.Router();
const contactController = require("../controllers/contactController");
router.post("/", contactController.createContact);
router.get("/", contactController.getAllContact);
router.put("/:id", contactController.updateContact);
router.delete("/:id", contactController.delContact);
module.exports = router;
