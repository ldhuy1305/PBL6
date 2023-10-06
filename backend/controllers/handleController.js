const { ObjectId } = require("mongodb");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findById(id);
    if (!doc) {
      return next(new AppError("Couldn't find this document", 404));
    }
    res.status(200).json(doc);
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({});
    return res.status(200).json(doc);
  });

exports.postOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const created = await Model.create(req.body);
    res.status(201).json(created);
  });

exports.delOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const doc = await Model.findByIdAndDelete({ id });
    if (!doc) {
      return next(new AppError("Couldn't find this document", 404));
    }
    res.status(201).json("Delete successfully");
  });

exports.putOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    const doc = await Model.findByIdAndUpdate({ id }, body);
    if (!doc) {
      return next(new AppError("Couldn't find this document", 404));
    }
    res.status(200).json(doc);
  });
