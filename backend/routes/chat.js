var express = require("express");
var router = express.Router();
const chatController = require("../controllers/chatController");
const authController = require("../controllers/authController");
router.use(authController.protect);
router.post("/", chatController.createChat);
router.get("/:userId", chatController.findUserChats);
router.get("/find/:user/:reference", chatController.findChat);

module.exports = router;
