const Contact = require("../models/contact");
const User = require("../models/userModel");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

class contactController {
  createContact = catchAsync(async (req, res, next) => {
    const body = req.body;
    console.log(body);

    req.body.contact = await Contact.create(body);
    req.body.defaultContact = req.body.contact.id;
    next();
  });
  getAllContact = catchAsync(async (req, res, next) => {
    req.body.contact = await Contact.find();
    next();
  });
  updateContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) return next(new appError("Người dùng không được tìm thấy", 404));
    await Contact.findByIdAndUpdate(user.defaultContact, req.body);
    next();
  });
  addContact = catchAsync(async (req, res, next) => {
    const body = req.body;
    req.body.contact = await Contact.create(body);
    next();
  });
  delContact = catchAsync(async (req, res, next) => {
    if (req.params.contactId == delContact.contact)
      next(new appError("Thông tin liên hệ mặc định không được xoá!", 404));
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) next(new appError("Thông tin liên hệ không tìm thấy!", 404));
    contact.__v = undefined;
    req.body.contact = contact;
    await Contact.findByIdAndDelete(req.params.contactId);
    next();
  });
  delAllContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    for (let i = 0; i < user.contact.length; i++) {
      await Contact.findByIdAndDelete(user.contact[i]._id);
    }
    next();
  });
}

module.exports = new contactController();
