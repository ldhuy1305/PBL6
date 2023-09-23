var express = require('express')
var router = express.Router();
const adminController = require('../../controllers/adminController');
router.get('/:id', adminController.viewUser);
router.put('/:id', adminController.updateUser);
router.delete('/:id', adminController.deleteUser);
module.exports = router;