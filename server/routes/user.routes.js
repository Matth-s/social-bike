const router = require('express').Router();
const userControllers = require('../controllers/user.controllers');

router.post('/signup', userControllers.signup);
router.post('/signin', userControllers.signin);
router.get('/refresh', userControllers.refresh);
router.get('/', userControllers.currentUser);
router.delete('/signout', userControllers.signout);

module.exports = router;
