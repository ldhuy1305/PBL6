const User = require('../models/users');
class UserController{
    // [GET] /user/:id
    async detail (req, res,next) {
        let id = await req.params.id;
        User.findOne({id})
            .then()
            .catch(err => next(err));
        }

    // [GET] /User
    async show (req, res,next){
        User.find()
            .then()
            .catch(err => next(err));
    };
    // [POST] /User/create
    async create(req, res,next){
        let body = await req.body
        User.create(body)
            .then()
            .catch(err =>next(err)); 
    };
    // [DELETE] /User/:id
    async delete (req, res, next){
        let id = await req.params.id;
        User.deleteOne({ id })
            .then()
            .catch(err => next(err));
    }
    // [PUT] /User/:id
    async update (req, res, next){
        const id = req.params.id;
        let body = req.body;
        User.updateOne({ id }, body)
            .then()
            .catch(err => next(err));
    }
}
module.exports = new UserController;