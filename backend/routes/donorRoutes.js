const express = require('express');
const router = express.Router();
const {
  createDonorProfile,
  getDonorProfile,
  updateDonorProfile,
  getEligibleBloodRequests,
  respondToBloodRequest,
  getDonationHistory,
  updateAvailabilityStatus,
} = require('../controllers/donorController');
const { protect, donor } = require('../middleware/authMiddleware');

router.route('/').post(protect, createDonorProfile);
router
  .route('/profile')
  .get(protect, donor, getDonorProfile)
  .put(protect, donor, updateDonorProfile);
router.route('/eligible-requests').get(protect, donor, getEligibleBloodRequests);
router.route('/respond/:requestId').post(protect, donor, respondToBloodRequest);
router.route('/donation-history').get(protect, donor, getDonationHistory);
router.route('/availability').put(protect, donor, updateAvailabilityStatus);

module.exports = router; 