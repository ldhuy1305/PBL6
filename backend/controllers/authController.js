const { promisify } = require("util");
const User = require("../models/User");
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
  const user = await User.findOne({ email });
  if (!user || !(await user.isCorrectPassword(password, user.password))) {
    return next(new AppError("invalid email or password", 401));
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

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${signUpToken}.\nIf you didn't forget your password, please ignore this email!`;

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
      doc.signupToken = undefined;
      doc.signupResetExpires = undefined;
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
    doc.passwordResetToken = undefined;
    doc.passwordResetExpires = undefined;
    doc.code = undefined;
    await doc.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Sign up successfully",
    });
  });
// exports.protect = catchAsync(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   }
//   if (!token) {
//     return next(new AppError("You are not logged in", 401));
//   }
//   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//   const user = await User.findById(decoded.id);
//   if (!user) {
//     return next(new AppError("The user for this token no longer exist", 401));
//   }
//   if (user.isPasswordChanged(decoded.iat)) {
//     return next(
//       new AppError(
//         "The user changed password recently relogin to continue",
//         401
//       )
//     );
//   }
//   req.user = user;
//   next();
// });
