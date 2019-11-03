const controller = require('../controllers/server.controller.js'),
    express = require('express'), 
    router = express.Router();

router.route('/')
  .get(controller.hello);
  
module.exports = router;