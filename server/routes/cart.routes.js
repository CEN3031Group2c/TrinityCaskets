const controller = require('../controllers/cart.controller'),
    express = require('express'),
    router = express.Router();

router.route('/')
    .get(controller.get)
    .post(controller.post);

router.route('/:userID')
    .get(controller.read)

router.param('userID', controller.userByID);


module.exports = router;