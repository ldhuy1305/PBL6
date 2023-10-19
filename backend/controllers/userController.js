const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const handleController = require("./handleController");
const authController = require("../controllers/authController");

class userController {
  sendEmail = authController.sendEmailVerify;
  signUpUser = authController.signUp(User, "User");
  verifiedUser = authController.verifiedSignUp(User);
  getAllUser = catchAsync(async (req, res, next) => {
    const shippers = await User.find({
      isVerified: true,
      role: "User",
    });
    return res.status(200).json(shippers);
  });
  getUserById = handleController.getOne(User);
  deleteUser = handleController.delOne(User);
  updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    for (let contact of user.contact) {
      if (contact._id == user.defaultContact) {
        contact.phoneNumber = req.body.phoneNumber;
        contact.address = req.body.address;
      }
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  changePass = catchAsync(async (req, res, next) => {
    // const { newPass, confirmedPass } = req.body;
    // const user = await User.findById(req.params.id).select("+password");

    const { oldPass, newPass, confirmedPass } = req.body;
    const user = await User.findById(req.params.id).select("+password");
    if (confirmedPass != newPass)
      next(new appError("Mật khẩu xác nhận không trùng khớp!", 404));
    if (!(await user.isCorrectPassword(user.password, oldPass)))
      next(new appError("Mật khẩu không đúng", 404));

    user.password = confirmedPass;
    user.passwordConfirm = confirmedPass;

    await user.save();
    // jwtToken.generateAndSendJWTToken(user, 201, res);
  });
  delContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    user.contact = user.contact.filter((obj) => obj.id != req.body.contact.id);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  addContact = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    user.contact.push(req.body.contact);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  setDefaultContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    user.defaultContact = req.params.contactId;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  viewOrder = catchAsync(async (req, res, next) => {});
}

module.exports = new userController();
