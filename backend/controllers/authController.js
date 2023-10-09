const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const jwtToken = require("../utils/jwtToken");
const sendEmail = require("../utils/email");
const generateAndSendJWTToken = require("../utils/jwtToken");
const crypto = require("crypto");
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

exports.signUp = (Model, role) =>
  catchAsync(async (req, res, next) => {
    const body = { ...req.body, role, isAccepted: false, isVerified: false };
    const doc = await Model.create(body);

    const signUpToken = doc.createSignUpToken();
    await doc.save({ validateBeforeSave: false });

    // 3) Send it to doc's email
    req.doc = doc;
    req.signUpToken = signUpToken;
    next();
  });

exports.sendEmailVerify = catchAsync(async (req, res, next) => {
  const doc = req.doc;
  const signUpToken = req.signUpToken;
  const message = `Hello,

    Thank you for registering an account on our website. To complete your registration, please enter the following confirmation code on our website:
    
    Confirmation Code: ${signUpToken}
    
    This code will be valid for 10 minutes from the time you receive this email. If you do not enter the code within this time, you will need to request a new one.
    
    If you did not request this code, please ignore this email.
    
    Best regards,
    FALTH 
    `;

  try {
    await sendEmail({
      email: doc.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      token: signUpToken,
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
    const doc = await Model.findById(req.params.id);

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

exports.forgotPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const doc = await Model.findOne({ email: req.body.email });
    if (!doc) {
      return next(new AppError("There is no account with email address", 404));
    }
    // 2) Generate the random reset token
    const resetToken = doc.createSignUpToken();
    await doc.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetToken}.\nIf you didn't forget your password, please ignore this email!`;
    try {
      await sendEmail({
        email: doc.email,
        subject: "Your password reset token (valid for 10 min)",
        message,
      });
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
exports.resetPassword = (Model) =>
  catchAsync(async (req, res, next) => {
    // 1) Get doc based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.body.token)
      .digest("hex");
    const doc = await Model.findById(req.params.id);

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
      message: "Sign up successfully",
    });
  });
