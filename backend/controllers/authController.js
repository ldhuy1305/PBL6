const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const Email = require("../utils/email");
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("please enter an email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new AppError("invalid email", 401));
  }
  if (!(await user.isCorrectPassword(user.password, password))) {
    return next(new AppError("invalid password", 401));
  }
  jwtToken.generateAndSendJWTToken(user, 200, res);
});

exports.signUp = (Model, role) => async (req, res, next) => {
  try {
    let body = {
      ...req.body,
      role,
      isAccepted: false,
      isVerified: false,
    };
    if (req.files) {
      body = {
        ...body,
        frontImageCCCD: req.files.frontImageCCCD[0]?.path,
        behindImageCCCD: req.files.behindImageCCCD[0]?.path,
        licenseImage: req.files.licenseImage[0]?.path,
      };
    }
    const doc = await Model.create(body);

    const signUpToken = doc.createSignUpToken();

    await doc.save({ validateBeforeSave: false });
    // 3) Send it to doc's email
    req.doc = doc;
    req.signUpToken = signUpToken;
    next();
  } catch (err) {
    if (req.files) {
      Object.keys(req.files).forEach((key) => {
        req.files[key].forEach((file) =>
          cloudinary.uploader.destroy(file.filename)
        );
      });
    }
    next(err);
  }
};

exports.sendEmailVerify = catchAsync(async (req, res, next) => {
  const doc = req.doc;
  const signUpToken = req.signUpToken;
  try {
    await new Email(doc, signUpToken, null).sendWelcome();
    res.status(200).json({
      message: "Token sent to email!",
    });
  } catch (err) {
    doc.signUpToken = undefined;
    doc.signUpResetExpires = undefined;
    await doc.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});
exports.verifiedSignUp = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const code = req.body.signUpToken.toString();
    const hashedToken = crypto
      .createHash("sha256")
      .update(code)
      .digest("hex");
    const doc = await Model.findOne({ email: req.params.email }).select(
      "+signUpExpires"
    );
    // 2) If token has not expired, and there is doc, set the new password
    if (
      !doc ||
      doc.signUpToken !== hashedToken ||
      !doc.signUpExpires > Date.now()
    ) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    doc.isVerified = true;
    doc.signUpToken = undefined;
    doc.signUpExpires = undefined;
    doc.code = undefined;
    await doc.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Sign up successfully",
    });
  });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const doc = await User.findOne({ email: req.body.email });
  if (!doc) {
    return next(new AppError("There is no account with email address", 404));
  }
  // 2) Generate the random reset token
  const resetToken = doc.createSignUpToken();
  await doc.save({ validateBeforeSave: false });
  try {
    const url = `${req.protocol}://${req.get("host")}/auth/verify-token`;
    await new Email(doc, resetToken, url).sendPasswordReset();
    res.status(200).json({
      message: "Token sent to email!",
    });
  } catch (error) {
    doc.signUpResetExpires = undefined;
    doc.signUpToken = undefined;
    await doc.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get doc based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const doc = await User.findOne({ email: req.params.email }).select(
    "+signUpToken +signUpExpires"
  );
  // 2) If token has not expired, and there is doc, set the new password
  if (
    !doc ||
    doc.signUpToken !== hashedToken ||
    !doc.signUpExpires > Date.now()
  ) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // 2) If token has not expired, and there is doc, set the new password
  doc.signUpToken = undefined;
  doc.signUpExpires = undefined;
  doc.code = undefined;
  doc.password = req.body.password;
  doc.passwordConfirm = req.body.passwordConfirm;
  await doc.save();

  res.status(200).json({
    message: "Reset password successfully. Please login again.",
  });
});

exports.verifiedToken = catchAsync(async (req, res, next) => {
  // 1) Get doc based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");
  const doc = await User.findOne({ email: req.params.email }).select(
    "+signUpToken +signUpExpires"
  );
  // 2) If token has not expired, and there is doc, set the new password
  if (
    !doc ||
    doc.signUpToken !== hashedToken ||
    !doc.signUpExpires > Date.now()
  ) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  res.status(200).json({
    message: "Your token is correct. Please reset your password",
  });
});
