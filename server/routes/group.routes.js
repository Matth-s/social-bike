const router = require('express').Router();
const groupController = require('../controllers/group.controllers');
const checkUser = require('../middleware/user.verifycation');

router.post('/create', checkUser, groupController.createGroup);
router.get('/', groupController.getGroups);

module.exports = router;
