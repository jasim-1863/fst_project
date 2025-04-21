const asyncHandler = require('express-async-handler');
const BloodRequest = require('../models/bloodRequestModel');
const Institution = require('../models/institutionModel');

// @desc    Get all blood requests
// @route   GET /api/bloodRequests
// @access  Public
const getBloodRequests = asyncHandler(async (req, res) => {
  // Enable search and filtering
  const keyword = req.query.keyword
    ? {
        $or: [
          { description: { $regex: req.query.keyword, $options: 'i' } },
          { location: { $regex: req.query.keyword, $options: 'i' } },
        ],
      }
    : {};
  
  const bloodType = req.query.bloodType ? { bloodType: req.query.bloodType } : {};
  const urgencyLevel = req.query.urgencyLevel ? { urgencyLevel: req.query.urgencyLevel } : {};
  const status = req.query.status ? { status: req.query.status } : { status: 'Open' };

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  // Get total count for pagination data
  const count = await BloodRequest.countDocuments({
    ...keyword,
    ...bloodType,
    ...urgencyLevel,
    ...status,
  });

  // Get blood requests
  const bloodRequests = await BloodRequest.find({
    ...keyword,
    ...bloodType,
    ...urgencyLevel,
    ...status,
  })
    .populate('institution', 'name location')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    bloodRequests,
    page,
    pages: Math.ceil(count / limit),
    total: count,
  });
});

// @desc    Get blood request by ID
// @route   GET /api/bloodRequests/:id
// @access  Public
const getBloodRequestById = asyncHandler(async (req, res) => {
  const bloodRequest = await BloodRequest.findById(req.params.id).populate(
    'institution',
    'name location contactPerson phone'
  );

  if (bloodRequest) {
    res.json(bloodRequest);
  } else {
    res.status(404);
    throw new Error('Blood request not found');
  }
});

// @desc    Search blood requests by location and blood type
// @route   GET /api/bloodRequests/search
// @access  Public
const searchBloodRequests = asyncHandler(async (req, res) => {
  const { bloodType, location } = req.query;
  
  let query = { status: 'Open' };
  
  if (bloodType) {
    query.bloodType = bloodType;
  }
  
  if (location) {
    query = {
      ...query,
      $or: [
        { 'location': { $regex: location, $options: 'i' } },
        { 'institution.location.city': { $regex: location, $options: 'i' } },
        { 'institution.location.state': { $regex: location, $options: 'i' } },
      ],
    };
  }
  
  const bloodRequests = await BloodRequest.find(query)
    .populate('institution', 'name location')
    .sort({ urgencyLevel: -1, createdAt: -1 });
  
  res.json(bloodRequests);
});

// @desc    Get upcoming blood donation events
// @route   GET /api/bloodRequests/events
// @access  Public
const getBloodDonationEvents = asyncHandler(async (req, res) => {
  const currentDate = new Date();
  
  // Find blood requests with future required dates (i.e., scheduled events)
  const events = await BloodRequest.find({
    requiredBy: { $gt: currentDate },
    status: 'Open',
  })
    .populate('institution', 'name location')
    .sort({ requiredBy: 1 })
    .limit(10);
  
  res.json(events);
});

// @desc    Get statistics for dashboard
// @route   GET /api/bloodRequests/stats
// @access  Public
const getBloodRequestStats = asyncHandler(async (req, res) => {
  // Get count by blood type
  const bloodTypeStats = await BloodRequest.aggregate([
    { $match: { status: 'Open' } },
    { $group: { _id: '$bloodType', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Get count by urgency level
  const urgencyStats = await BloodRequest.aggregate([
    { $match: { status: 'Open' } },
    { $group: { _id: '$urgencyLevel', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);

  // Get recent fulfilled requests (for testimonials or success stories)
  const recentFulfilled = await BloodRequest.find({ status: 'Fulfilled' })
    .populate('institution', 'name')
    .sort({ updatedAt: -1 })
    .limit(5);

  // Get total counts
  const totalOpen = await BloodRequest.countDocuments({ status: 'Open' });
  const totalInProgress = await BloodRequest.countDocuments({ status: 'In Progress' });
  const totalFulfilled = await BloodRequest.countDocuments({ status: 'Fulfilled' });

  res.json({
    bloodTypeStats,
    urgencyStats,
    recentFulfilled,
    totalOpen,
    totalInProgress,
    totalFulfilled,
  });
});

module.exports = {
  getBloodRequests,
  getBloodRequestById,
  searchBloodRequests,
  getBloodDonationEvents,
  getBloodRequestStats,
}; 