const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAllFees, createFee, getMyFees, markFeePaid } = require('../controllers/feeController');

const router = express.Router();

router.use(protect);

router.route('/')
    .get(authorize('Admin', 'Principal'), getAllFees)
    .post(authorize('Admin'), createFee);

router.get('/myfees', getMyFees);

router.route('/:id/pay')
    .put(authorize('Admin'), markFeePaid); // Admin manually confirming payment

module.exports = router;
