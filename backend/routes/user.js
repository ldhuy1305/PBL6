var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactController");
router.post(
  "/",
  contactController.createContact,
  userController.signUpUser,
  userController.sendEmail
);
router.post("/forgot-password/", userController.forgotPassword);
router.post("/reset-password/:id", userController.resetPassword);
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
router.post(
  "/set-default-contact/:userId/:contactId",
  userController.setDefaultContact
);
module.exports = router;
