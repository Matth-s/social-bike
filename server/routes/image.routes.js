const router = require('express').Router();
const imageController = require('../controllers/image.controllers');

router.post('/image', imageController.uploadImage);

module.exports = router;
