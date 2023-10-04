const Contact = require("../models/contact");
const User = require("../models/User");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const handleController = require("./handleController");

class contactController {
  createContact = catchAsync(async (req, res, next) => {
    const body = req.body;
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
    req.body.contact = await Contact.findByIdAndUpdate(
      user.defaultContact,
      req.body
    );
    console.log(req.body.contact);
    next();
  });
  addContact = catchAsync(async (req, res, next) => {
    const body = req.body;
    req.body.contact = await Contact.create(body);
    next();
  });
  delContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.findById(req.params.contactId);
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
