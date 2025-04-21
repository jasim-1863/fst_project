const express = require('express');
const router = express.Router();
const {
  getBloodRequests,
  getBloodRequestById,
  searchBloodRequests,
  getBloodDonationEvents,
  getBloodRequestStats,
} = require('../controllers/bloodRequestController');

router.route('/').get(getBloodRequests);
router.route('/search').get(searchBloodRequests);
router.route('/events').get(getBloodDonationEvents);
router.route('/stats').get(getBloodRequestStats);
router.route('/:id').get(getBloodRequestById);

module.exports = router; 