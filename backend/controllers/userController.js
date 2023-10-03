const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const handleController = require("./handleController");
const authController = require("./authController");
const bcrypt = require("bcrypt");

class userController {
  signUpUser = handleController.postOne(User);
  getAllUser = handleController.getAll(User);
  getUserById = handleController.getOne(User);
  updateUser = handleController.putOne(User);
  deleteUser = handleController.delOne(User);
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
    jwtToken.generateAndSendJWTToken(user, 401, res);
  });
}

module.exports = new userController();
