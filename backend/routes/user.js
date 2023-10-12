var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactController");
router
  .route("/")
  .post(
    contactController.createContact,
    userController.signUpUser,
    userController.sendEmail
  )
  .get(userController.getAllUser);

router.route("/:email").post(userController.verifiedUser);
router
  .route("/:id")
  .get(contactController.getAllContact, userController.getUserById)
  .patch(contactController.updateContact, userController.updateUser)
  .delete(contactController.delAllContact, userController.deleteUser);
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
