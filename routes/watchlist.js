var express = require('express');

const {watchlistPage , deleteItem, stockPagePost } = require('../controllers/watchlistControllers');

var router = express.Router();


router.get('/', watchlistPage);

router.post('/', stockPagePost);

router.delete('/:id', deleteItem);




module.exports = router;