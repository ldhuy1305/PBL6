const Model = require("../models");
class HandleController {
  async getOne(req, res, next, Model) {
    const id = await req.params.id;
    Model.findOne({ id })
      .then()
      .catch((err) => next(err));
  }
  async getAll(req, res, next, Model) {
    Model.find()
      .then()
      .catch((err) => next(err));
  }
  async create(req, res, next) {
    const body = await req.body;
    User.create(body)
      .then()
      .catch((err) => next(err));
  }
  // [DELETE] /User/:id
  async delete(req, res, next) {
    const id = await req.params.id;
    User.deleteOne({ id })
      .then()
      .catch((err) => next(err));
  }
  // [PUT] /User/:id
  async update(req, res, next) {
    const id = req.params.id;
    const body = req.body;
    User.updateOne({ id }, body)
      .then()
      .catch((err) => next(err));
  }
}
module.exports = new UserController();
