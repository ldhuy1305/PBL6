var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");
const contactController = require("../controllers/contactController");
const authController = require("../controllers/authController");
router.route("/:email").post(userController.verifiedUser);
router
  .route("/")
  .post(
    contactController.createContact,
    userController.signUpUser,
    userController.sendEmail
  );
router.use(authController.protect);
router
  .route("/")
  .get(authController.restrict("Admin"), userController.getAllUser);

router
  .route("/:id")
  .get(
    authController.restrict("User"),
    contactController.getAllContact,
    userController.getUserById
  )
  .patch(
    authController.restrict("User"),
    contactController.updateContact,
    userController.updateUser
  )
  .delete(
    authController.restrict("Admin"),
    contactController.delAllContact,
    userController.deleteUser
  );
router.post(
  "/change-pass/:id",
  authController.restrict("User"),
  userController.changePass
);
router.put(
  "/add-contact/:id",
  authController.restrict("User"),
  contactController.addContact,
  userController.addContact
);
router.delete(
  "/del-contact/:userId/:contactId",
  authController.restrict("User"),
  userController.delContact,
  contactController.delContact
);
router.post(
  "/set-default-contact/:userId/:contactId",
  authController.restrict("User"),
  userController.setDefaultContact
);
module.exports = router;
