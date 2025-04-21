const asyncHandler = require('express-async-handler');
const Institution = require('../models/institutionModel');
const BloodRequest = require('../models/bloodRequestModel');
const Donor = require('../models/donorModel');

// @desc    Create institution profile
// @route   POST /api/institutions
// @access  Private
const createInstitutionProfile = asyncHandler(async (req, res) => {
  const { name, location, contactPerson, phone, description, operatingHours } = req.body;

  // Check if institution profile already exists
  const institutionExists = await Institution.findOne({ user: req.user._id });

  if (institutionExists) {
    res.status(400);
    throw new Error('Institution profile already exists');
  }

  // Create institution profile
  const institution = await Institution.create({
    user: req.user._id,
    name,
    location,
    contactPerson,
    phone,
    description,
    operatingHours,
  });

  if (institution) {
    res.status(201).json(institution);
  } else {
    res.status(400);
    throw new Error('Invalid institution data');
  }
});

// @desc    Get institution profile
// @route   GET /api/institutions/profile
// @access  Private
const getInstitutionProfile = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (institution) {
    res.json(institution);
  } else {
    res.status(404);
    throw new Error('Institution profile not found');
  }
});

// @desc    Update institution profile
// @route   PUT /api/institutions/profile
// @access  Private
const updateInstitutionProfile = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (institution) {
    institution.name = req.body.name || institution.name;
    institution.location = req.body.location || institution.location;
    institution.contactPerson = req.body.contactPerson || institution.contactPerson;
    institution.phone = req.body.phone || institution.phone;
    institution.description = req.body.description || institution.description;
    institution.operatingHours = req.body.operatingHours || institution.operatingHours;

    const updatedInstitution = await institution.save();
    res.json(updatedInstitution);
  } else {
    res.status(404);
    throw new Error('Institution profile not found');
  }
});

// @desc    Create a blood request
// @route   POST /api/institutions/blood-requests
// @access  Private
const createBloodRequest = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const {
    bloodType,
    quantity,
    urgencyLevel,
    requiredBy,
    description,
    location,
  } = req.body;

  const bloodRequest = await BloodRequest.create({
    institution: institution._id,
    bloodType,
    quantity,
    urgencyLevel,
    requiredBy,
    description,
    location,
  });

  if (bloodRequest) {
    // Add the request to the institution's history
    institution.bloodRequestsHistory.push(bloodRequest._id);
    await institution.save();

    res.status(201).json(bloodRequest);
  } else {
    res.status(400);
    throw new Error('Invalid blood request data');
  }
});

// @desc    Get all blood requests for institution
// @route   GET /api/institutions/blood-requests
// @access  Private
const getInstitutionBloodRequests = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const bloodRequests = await BloodRequest.find({ institution: institution._id }).sort({
    createdAt: -1,
  });

  res.json(bloodRequests);
});

// @desc    Get a specific blood request
// @route   GET /api/institutions/blood-requests/:id
// @access  Private
const getBloodRequestById = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const bloodRequest = await BloodRequest.findById(req.params.id);

  if (bloodRequest) {
    // Check if the blood request belongs to this institution
    if (bloodRequest.institution.toString() !== institution._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to access this request');
    }

    const populatedRequest = await BloodRequest.findById(req.params.id).populate({
      path: 'respondingDonors.donor',
      select: 'name phone bloodType',
    });

    res.json(populatedRequest);
  } else {
    res.status(404);
    throw new Error('Blood request not found');
  }
});

// @desc    Update blood request
// @route   PUT /api/institutions/blood-requests/:id
// @access  Private
const updateBloodRequest = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const bloodRequest = await BloodRequest.findById(req.params.id);

  if (bloodRequest) {
    // Check if the blood request belongs to this institution
    if (bloodRequest.institution.toString() !== institution._id.toString()) {
      res.status(401);
      throw new Error('Not authorized to update this request');
    }

    bloodRequest.bloodType = req.body.bloodType || bloodRequest.bloodType;
    bloodRequest.quantity = req.body.quantity || bloodRequest.quantity;
    bloodRequest.urgencyLevel = req.body.urgencyLevel || bloodRequest.urgencyLevel;
    bloodRequest.status = req.body.status || bloodRequest.status;
    bloodRequest.requiredBy = req.body.requiredBy || bloodRequest.requiredBy;
    bloodRequest.description = req.body.description || bloodRequest.description;
    bloodRequest.location = req.body.location || bloodRequest.location;

    const updatedRequest = await bloodRequest.save();
    res.json(updatedRequest);
  } else {
    res.status(404);
    throw new Error('Blood request not found');
  }
});

// @desc    Confirm donor's appointment
// @route   PUT /api/institutions/blood-requests/:id/confirm/:donorId
// @access  Private
const confirmDonorAppointment = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const bloodRequest = await BloodRequest.findById(req.params.id);

  if (!bloodRequest) {
    res.status(404);
    throw new Error('Blood request not found');
  }

  // Check if the blood request belongs to this institution
  if (bloodRequest.institution.toString() !== institution._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this request');
  }

  // Find the donor in the responding donors array
  const respondingDonorIndex = bloodRequest.respondingDonors.findIndex(
    (r) => r.donor.toString() === req.params.donorId
  );

  if (respondingDonorIndex === -1) {
    res.status(404);
    throw new Error('Donor not found in responding donors list');
  }

  // Update the donor's status to Confirmed
  bloodRequest.respondingDonors[respondingDonorIndex].status = 'Confirmed';
  bloodRequest.respondingDonors[respondingDonorIndex].appointmentDate = 
    req.body.appointmentDate || bloodRequest.respondingDonors[respondingDonorIndex].appointmentDate;

  await bloodRequest.save();
  res.json({ message: 'Donor appointment confirmed' });
});

// @desc    Mark donation as completed
// @route   PUT /api/institutions/blood-requests/:id/complete/:donorId
// @access  Private
const completeDonation = asyncHandler(async (req, res) => {
  const institution = await Institution.findOne({ user: req.user._id });

  if (!institution) {
    res.status(404);
    throw new Error('Institution profile not found');
  }

  const bloodRequest = await BloodRequest.findById(req.params.id);

  if (!bloodRequest) {
    res.status(404);
    throw new Error('Blood request not found');
  }

  // Check if the blood request belongs to this institution
  if (bloodRequest.institution.toString() !== institution._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this request');
  }

  // Find the donor in the responding donors array
  const respondingDonorIndex = bloodRequest.respondingDonors.findIndex(
    (r) => r.donor.toString() === req.params.donorId
  );

  if (respondingDonorIndex === -1) {
    res.status(404);
    throw new Error('Donor not found in responding donors list');
  }

  // Update the donor's status to Completed
  bloodRequest.respondingDonors[respondingDonorIndex].status = 'Completed';

  // Update the donor's donation history
  const donor = await Donor.findById(req.params.donorId);
  
  if (donor) {
    donor.donationHistory.push({
      date: new Date(),
      location: bloodRequest.location,
      institution: institution._id,
      requestId: bloodRequest._id,
    });
    
    donor.lastDonationDate = new Date();
    await donor.save();
  }

  // Check if all required units have been donated
  const completedDonations = bloodRequest.respondingDonors.filter(
    (r) => r.status === 'Completed'
  ).length;

  if (completedDonations >= bloodRequest.quantity) {
    bloodRequest.status = 'Fulfilled';
  }

  await bloodRequest.save();
  res.json({ message: 'Donation marked as completed' });
});

module.exports = {
  createInstitutionProfile,
  getInstitutionProfile,
  updateInstitutionProfile,
  createBloodRequest,
  getInstitutionBloodRequests,
  getBloodRequestById,
  updateBloodRequest,
  confirmDonorAppointment,
  completeDonation,
}; 