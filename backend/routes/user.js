var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactController");
router.post("/", contactController.createContact, userController.signUpUser);
router.get("/:id", contactController.getAllContact, userController.getUserById);
router.get("/", userController.getAllUser);
router.patch(
  "/:id",
  contactController.updateContact,
  userController.updateUser
);
router.delete(
  "/:id",
  contactController.delAllContact,
  userController.deleteUser
);
router.post("/change-pass/:id", userController.changePass);
router.put(
  "/add-contact/:id",
  contactController.addContact,
  userController.addContact
);
router.delete(
  "/del-contact/:userId/:contactId",
  contactController.delContact,
  userController.delContact
);
module.exports = router;
