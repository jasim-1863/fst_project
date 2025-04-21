const express = require('express');
const router = express.Router();
const {
  createInstitutionProfile,
  getInstitutionProfile,
  updateInstitutionProfile,
  createBloodRequest,
  getInstitutionBloodRequests,
  getBloodRequestById,
  updateBloodRequest,
  confirmDonorAppointment,
  completeDonation,
} = require('../controllers/institutionController');
const { protect, institution } = require('../middleware/authMiddleware');

router.route('/').post(protect, createInstitutionProfile);
router
  .route('/profile')
  .get(protect, institution, getInstitutionProfile)
  .put(protect, institution, updateInstitutionProfile);

router
  .route('/blood-requests')
  .get(protect, institution, getInstitutionBloodRequests)
  .post(protect, institution, createBloodRequest);

router
  .route('/blood-requests/:id')
  .get(protect, institution, getBloodRequestById)
  .put(protect, institution, updateBloodRequest);

router
  .route('/blood-requests/:id/confirm/:donorId')
  .put(protect, institution, confirmDonorAppointment);

router
  .route('/blood-requests/:id/complete/:donorId')
  .put(protect, institution, completeDonation);

module.exports = router; 