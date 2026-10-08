const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getBuses, createBus, updateLocation } = require('../controllers/transportController');

const router = express.Router();

router.use(protect);

router.route('/buses')
    .get(getBuses)
    .post(authorize('Admin'), createBus);

router.route('/location/:id')
    .put(authorize('Admin', 'Driver'), updateLocation);

module.exports = router;
