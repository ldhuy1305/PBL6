const { ObjectId } = require("mongodb");

class handleController {
  getOne = (Model) => async (req, res, next) => {
    const id = req.params.id;
    await Model.findOne({ id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  };

  getAll = (Model) => async (req, res, next) => {
    await Model.find({})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        next(err);
      });
  };

  postOne = (Model) => async (req, res, next) => {
    await Model.create(req.body)
      .then((createdModel) => {
        res.status(201).json(createdModel);
      })
      .catch((err) => {
        next(err);
      });
  };

  delOne = (Model) => async (req, res, next) => {
    const id = req.params.id;
    await Model.deleteOne({ id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  };

  putOne = (Model) => async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    await Model.updateOne({ id }, body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  };
}

module.exports = new handleController();
