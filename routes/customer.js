const express = require('express');
const router = express.Router();
const customerController = require('../controllers/register_controller');


router.post('/register', customerController.register);

module.exports = router;