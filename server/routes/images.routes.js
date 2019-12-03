const express = require('express');
const controller = require('../controllers/images.controller')
const router = express.Router();

router.route('/image-upload')
      .post(controller.create);

module.exports = router;

