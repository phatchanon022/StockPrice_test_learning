var express = require('express');

const {peRatioPage, pePagePost } = require('../controllers/peratioControllers');

var router = express.Router();

router.get('/', peRatioPage);

router.post('/', pePagePost);





module.exports = router;