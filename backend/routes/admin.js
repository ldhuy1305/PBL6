var express = require('express')
var router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/:id', adminController.showAdmin);
module.exports = router;