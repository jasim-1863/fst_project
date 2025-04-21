const asyncHandler = require('express-async-handler');
const Donor = require('../models/donorModel');
const BloodRequest = require('../models/bloodRequestModel');

// @desc    Create donor profile
// @route   POST /api/donors
// @access  Private
const createDonorProfile = asyncHandler(async (req, res) => {
  const { name, phone, bloodType, address } = req.body;

  // Check if donor profile already exists
  const donorExists = await Donor.findOne({ user: req.user._id });

  if (donorExists) {
    res.status(400);
    throw new Error('Donor profile already exists');
  }

  // Create donor profile
  const donor = await Donor.create({
    user: req.user._id,
    name,
    phone,
    bloodType,
    address,
  });

  if (donor) {
    res.status(201).json(donor);
  } else {
    res.status(400);
    throw new Error('Invalid donor data');
  }
});

// @desc    Get donor profile
// @route   GET /api/donors/profile
// @access  Private
const getDonorProfile = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });

  if (donor) {
    res.json(donor);
  } else {
    res.status(404);
    throw new Error('Donor profile not found');
  }
});

// @desc    Update donor profile
// @route   PUT /api/donors/profile
// @access  Private
const updateDonorProfile = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });

  if (donor) {
    donor.name = req.body.name || donor.name;
    donor.phone = req.body.phone || donor.phone;
    donor.bloodType = req.body.bloodType || donor.bloodType;
    donor.address = req.body.address || donor.address;
    donor.availabilityStatus = req.body.availabilityStatus || donor.availabilityStatus;

    const updatedDonor = await donor.save();
    res.json(updatedDonor);
  } else {
    res.status(404);
    throw new Error('Donor profile not found');
  }
});

// @desc    Get all eligible blood requests for donor
// @route   GET /api/donors/eligible-requests
// @access  Private
const getEligibleBloodRequests = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });

  if (!donor) {
    res.status(404);
    throw new Error('Donor profile not found');
  }

  // Find all open blood requests matching donor's blood type or requesting 'Any' blood type
  const eligibleRequests = await BloodRequest.find({
    $or: [
      { bloodType: donor.bloodType },
      { bloodType: 'Any' },
    ],
    status: 'Open',
  }).populate('institution', 'name location');

  res.json(eligibleRequests);
});

// @desc    Respond to a blood request
// @route   POST /api/donors/respond/:requestId
// @access  Private
const respondToBloodRequest = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });
  
  if (!donor) {
    res.status(404);
    throw new Error('Donor profile not found');
  }

  const bloodRequest = await BloodRequest.findById(req.params.requestId);
  
  if (!bloodRequest) {
    res.status(404);
    throw new Error('Blood request not found');
  }

  // Check if donor has already responded to this request
  const alreadyResponded = bloodRequest.respondingDonors.find(
    (r) => r.donor.toString() === donor._id.toString()
  );

  if (alreadyResponded) {
    res.status(400);
    throw new Error('Donor has already responded to this request');
  }

  // Add donor to responding donors
  bloodRequest.respondingDonors.push({
    donor: donor._id,
    status: 'Interested',
    appointmentDate: req.body.appointmentDate || null,
  });

  // Update request status to In Progress if it was Open
  if (bloodRequest.status === 'Open') {
    bloodRequest.status = 'In Progress';
  }

  await bloodRequest.save();
  res.status(201).json({ message: 'Successfully responded to blood request' });
});

// @desc    Get donor donation history
// @route   GET /api/donors/donation-history
// @access  Private
const getDonationHistory = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });

  if (!donor) {
    res.status(404);
    throw new Error('Donor profile not found');
  }

  res.json(donor.donationHistory);
});

// @desc    Update donor availability status
// @route   PUT /api/donors/availability
// @access  Private
const updateAvailabilityStatus = asyncHandler(async (req, res) => {
  const donor = await Donor.findOne({ user: req.user._id });

  if (!donor) {
    res.status(404);
    throw new Error('Donor profile not found');
  }

  const { availabilityStatus } = req.body;

  if (!availabilityStatus || !['available', 'unavailable'].includes(availabilityStatus)) {
    res.status(400);
    throw new Error('Please provide a valid availability status (available/unavailable)');
  }

  donor.availabilityStatus = availabilityStatus;
  await donor.save();

  res.json({ message: `Availability status updated to ${availabilityStatus}` });
});

module.exports = {
  createDonorProfile,
  getDonorProfile,
  updateDonorProfile,
  getEligibleBloodRequests,
  respondToBloodRequest,
  getDonationHistory,
  updateAvailabilityStatus,
}; 