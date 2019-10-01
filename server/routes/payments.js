const express = require('express');
const router = express.Router();

const UserCtrl = require('../controllers/user');
const PaymentCtrl = require('../controllers/payment');




router.get('', UserCtrl.authMiddleware, PaymentCtrl.getPendingPayments);

module.exports = router;
