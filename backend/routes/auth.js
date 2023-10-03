var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const auth = new authController();
router.post("/login", auth.login);
module.exports = router;
