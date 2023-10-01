const Model = require("../models");

class HandleController {
  getOne(req, res, next) {
    const id = req.params.id;
    Model.findOne({ id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  getAll(req, res, next) {
    Model.find()
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        next(err);
      });
  }

  postOne(req, res, next) {
    const body = req.body;
    Model.create(body)
      .then((createdModel) => {
        res.status(201).json(createdModel);
      })
      .catch((err) => {
        next(err);
      });
  }

  delOne(req, res, next) {
    const id = req.params.id;
    Model.deleteOne({ id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }

  putOne(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    Model.updateOne({ id }, body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = new HandleController();
