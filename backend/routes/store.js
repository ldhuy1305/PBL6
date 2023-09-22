var express = require('express')
var router = express.Router();
const storeController = require('../controllers/storeController');
router.post('/', storeController.create)
router.get('/:id', storeController.detail);
router.get('/', storeController.show);
router.put('/:id', storeController.update);
router.delete('/:id', storeController.delete);
module.exports = router;