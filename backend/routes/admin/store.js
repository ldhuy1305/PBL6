var express = require('express')
var router = express.Router();
const adminController = require('../../controllers/adminController');
router.get('/', adminController.viewAllStore);
router.get('/:id', adminController.viewStore);
router.put('/:id', adminController.updateStore);
router.delete('/:id', adminController.deleteStore);
router.post('/:id/lock', adminController.lockStore); 
module.exports = router;