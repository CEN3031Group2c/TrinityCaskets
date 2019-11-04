const controller = require('../controllers/listings.controller'),
  express = require('express'),
  router = express.Router();

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:listingId')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router.param('listingId', controller.listingByID);

module.exports = router;