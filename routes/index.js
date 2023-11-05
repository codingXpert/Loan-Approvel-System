const express = require('express');
const router = express.Router();


router.use('/customer', require('./customer'));
router.use('/loan', require('./loan'));

module.exports = router;