const mongoose = require('mongoose');

const donorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    bloodType: {
      type: String,
      required: [true, 'Please add a blood type'],
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    address: {
      street: String,
      city: {
        type: String,
        required: [true, 'Please add a city'],
      },
      state: {
        type: String,
        required: [true, 'Please add a state'],
      },
      zipCode: String,
      country: {
        type: String,
        required: [true, 'Please add a country'],
      },
    },
    donationHistory: [
      {
        date: {
          type: Date,
        },
        location: String,
        institution: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Institution',
        },
        requestId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'BloodRequest',
        },
      },
    ],
    availabilityStatus: {
      type: String,
      enum: ['available', 'unavailable'],
      default: 'available',
    },
    lastDonationDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donor', donorSchema); 