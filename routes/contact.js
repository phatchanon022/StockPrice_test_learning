var express = require('express');

const { contactPage, getUserFormData, contactPagePostSendMail  } = require('../controllers/contactControllers');

var router = express.Router();

router.get('/', contactPage);

router.post('/',getUserFormData, contactPagePostSendMail);











module.exports = router;
