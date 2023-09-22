var express = require('express')
var router = express.Router();
const userController = require('../controllers/userController');
router.post('/', userController.create)
router.get('/:id', userController.detail);
router.get('/', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
module.exports = router;