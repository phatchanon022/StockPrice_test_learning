var express = require('express');

const {stockPage, stockPagePost , addlist} = require('../controllers/stockControllers');


var router = express.Router();

router.get('/', stockPage);

router.post('/',stockPagePost , addlist);



module.exports = router;