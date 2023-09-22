var express = require('express')
var router = express.Router();
const adminController = require('../controllers/adminController');
router.post('/', adminController.create)
router.get('/', adminController.show);
router.get('/:id', adminController.detail);
router.put('/:id', adminController.update);
router.delete('/:id', adminController.delete);
module.exports = router;