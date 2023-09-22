var express = require('express')
var router = express.Router();
const shipperController = require('../controllers/shipperController');
router.post('/', shipperController.create)
router.get('/:id', shipperController.detail);
router.get('/', shipperController.show);
router.put('/:id', shipperController.update);
router.delete('/:id', shipperController.delete);
module.exports = router;