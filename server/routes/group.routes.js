const router = require('express').Router();
const groupController = require('../controllers/group.controllers');
const checkUser = require('../middleware/user.verifycation');

router.post('/create', checkUser, groupController.createGroup);
router.post('/ask-to-join', checkUser, groupController.askToJoin);
router.post('/join', checkUser, groupController.joinGroup);

router.get(
  '/joined-groups',
  checkUser,
  groupController.getJoinedGroups
);
router.get(
  '/groups-created',
  checkUser,
  groupController.getCreatedGroups
);
router.get('/', groupController.getGroups);

module.exports = router;
