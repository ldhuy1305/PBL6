const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
class authController {
  async login(req, res, next) {
    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError("Please provide email and password", 400));
    }
    //2) Check if user exist and password is correct
    const user = await User.findOne({ email });
    const passHash = await bcrypt.hashSync(password, 12);
    if (!user || !bcrypt.compareSync(password, passHash)) {
      return next(new AppError("Incorrect email or password", 401));
    }

    //3) If everything ok, send token to client
    sendToken(user, res);
  }
  signToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }
  sendToken(user, res) {
    const token = signToken(user._id);
    res.cookie("jwt", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      SameSite: strict,
    });
  }
  getToken(req) {
    let authorization = req.headers.authorization;
    if (authorization && authorization.split(" ")[0] === "Bearer") {
      return authorization.split(" ")[1];
    }
    return null;
  }
  async decodeToken(req, next) {
    const token = await authController.getToken(req);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ email: decoded.email });
      if (!user)
        next(
          new AppError(
            "The user belonging to this token does no longer exist",
            401
          )
        );
      if (user._id != decoded._id) next(new AppError("Wrong token", 401));
      req.user = user;
      next();
    } catch (error) {
      next(
        new AppError("You are not logged in! Please log in to get access", 401)
      );
    }
  }
  signUp = (Model, role) =>
    catchAsync(async (req, res, next) => {
      const data = { ...req.body, role: role, isAccepted: false };
      const newDoc = await Model.create(data);
      // this.sendToken(newDoc, res);
    });
}

module.exports = new authController();
