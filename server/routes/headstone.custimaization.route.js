var headstone = require('../controllers/headstone.custom.controller')
var express = require('express')
var router = express.Router();

router.route('/').post(headstone.create)

router.route('/:userID/:headstoneID').get(headstone.read).post(headstone.update);
module.exports = router