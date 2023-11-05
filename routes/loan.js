const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan_controller');


router.post('/save', loanController.loanData);

module.exports = router;