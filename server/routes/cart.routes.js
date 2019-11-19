const controller = require('../controllers/cart.controller'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(controller.get)
    .post(controller.post);

module.exports = router;