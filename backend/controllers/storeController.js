const Store = require('../models/stores');
class storeController{
    // [GET] /stores/:id
    async detail (req, res,next) {
        let id = await req.params.id;
        Store.findOne({id})
            .then()
            .catch(err => next(err));
        }
    // [GET] /store
    async show (req, res,next){
        Store.find()
            .then()
            .catch(err => next(err));
    };
    // [POST] /store/create
    async create(req, res,next){
        let body = await req.body
        Store.create(body)
            .then()
            .catch(err =>next(err)); 
    };
    // [DELETE] /store/:id
    async delete (req, res, next){
        let id = await req.params.id;
        Store.deleteOne({ id })
            .then()
            .catch(err => next(err));
    }
    // [PUT] /store/:id
    async update (req, res, next){
        const id = req.params.id;
        let body = req.body;
        Store.updateOne({ id }, body)
            .then()
            .catch(err => next(err));
    }
}
module.exports = new storeController;