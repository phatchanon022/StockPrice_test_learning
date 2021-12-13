var express = require('express');

const {indexPage , chartIndexPageData , indexPagePost } = require('../controllers/indexControllers');

var router = express.Router();

router.get('/', indexPage);

router.post('/', indexPagePost);

router.get('/chartIndexPageData', chartIndexPageData);







module.exports = router;
