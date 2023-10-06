const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const handleController = require("./handleController");

class userController {
  signUpUser = catchAsync(async (req, res, next) => {
    const body = req.body;
    const user = await User.create(body);
    jwtToken.generateAndSendJWTToken(user, 201, res);
  });
  getAllUser = handleController.getAll(User);
  getUserById = handleController.getOne(User);
  deleteUser = handleController.delOne(User);
  updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    console.log(user);
    for (let i = 0; i < user.contact.length; i++) {
      if (user.contact[i]._id == user.defaultContact) {
        user.contact[i].phoneNumber = req.body.phoneNumber;
        user.contact[i].address = req.body.address;
      }
    }
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  changePass = catchAsync(async (req, res, next) => {
    const { oldPass, newPass, confirmedPass } = req.body;
    const user = await User.findById(req.params.id);

    if (!(await user.isCorrectPassword(oldPass, user.password)))
      next(new AppError("Invalid password", 404));

    if (confirmedPass != newPass)
      next(new AppError("passwordConfirm: Passwords are not the same!", 404));

    user.password = confirmedPass;
    user.passwordConfirm = confirmedPass;

    await user.save();
    jwtToken.generateAndSendJWTToken(user, 201, res);
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
