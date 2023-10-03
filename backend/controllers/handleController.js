const { ObjectId } = require("mongodb");
const AppError = require("./../utils/AppError");
const catchAsync = require("./../utils/catchAsync");

class handleController {
  getOne = (Model) =>
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      let doc = await Model.findById(id);
      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: doc,
      });
    });

  getAll = (Model) =>
    catchAsync(async (req, res, next) => {
      const doc = await Model.find();
      if (!doc) {
        return next(new AppError("No document found", 404));
      }
      res.status(200).json({
        status: "success",
        data: doc,
      });
    });

  postOne = (Model) =>
    catchAsync(async (req, res, next) => {
      const body = req.body;
      const newDoc = await Model.create(body);

      res.status(201).json({
        status: "success",
        data: {
          data: newDoc,
        },
      });
    });

  delOne = (Model) =>
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const doc = await Model.findByIdAndDelete(id);

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(204).json({
        status: "success",
      });
    });

  putOne = (Model) =>
    catchAsync(async (req, res, next) => {
      const id = req.params.id;
      const body = req.body;
      const doc = await Model.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });

      if (!doc) {
        return next(new AppError("No document found with that ID", 404));
      }

      res.status(200).json({
        status: "success",
        data: {
          data: doc,
        },
      });
    });
}

module.exports = new handleController();
