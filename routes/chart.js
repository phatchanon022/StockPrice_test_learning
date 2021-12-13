var express = require('express');

var router = express.Router();

var {chart, chartPagePost } = require('../controllers/chartControllers');


router.get('/', chart);


router.post('/', chartPagePost );




module.exports = router;