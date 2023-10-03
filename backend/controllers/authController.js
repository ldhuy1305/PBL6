const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const { strict } = require("assert");

const signToken = (id) => {
  return jwt.sign(
    {
      id: id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_TTL,
    }
  );
};

const generateAndSendJWTToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_TTL * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    SameSite: strict,
  });
  res.status(statusCode).json({
    status: "success",
    token: token,
    data: {
      user: user,
    },
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return next(new AppError("please enter an email and password", 400));
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || !(await bcrypt.compareSync(password, user.password))) {
    return next(new AppError("invalid email or password", 401));
  }
  generateAndSendJWTToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new AppError("The user for this token no longer exist", 401));
  }
  // if (user.isPasswordChanged(decoded.iat)) {
  //   return next(
  //     new AppError(
  //       "The user changed password recently relogin to continue",
  //       401
  //     )
  //   );
  // }
  req.user = user;
  next();
});
