const mongoose = require('mongoose');

const bloodRequestSchema = mongoose.Schema(
  {
    institution: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Institution',
    },
    bloodType: {
      type: String,
      required: [true, 'Please add a blood type'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Any'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity in units'],
      min: [1, 'Quantity must be at least 1 unit'],
    },
    urgencyLevel: {
      type: String,
      required: [true, 'Please add urgency level'],
      enum: ['Low', 'Medium', 'High', 'Critical'],
    },
    status: {
      type: String,
      enum: ['Open', 'In Progress', 'Fulfilled', 'Cancelled'],
      default: 'Open',
    },
    requiredBy: {
      type: Date,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
      required: [true, 'Please add a donation location'],
    },
    respondingDonors: [
      {
        donor: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Donor',
        },
        status: {
          type: String,
          enum: ['Interested', 'Confirmed', 'Completed', 'Cancelled'],
          default: 'Interested',
        },
        appointmentDate: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('BloodRequest', bloodRequestSchema); 