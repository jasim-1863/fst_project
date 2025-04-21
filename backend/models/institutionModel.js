const mongoose = require('mongoose');

const institutionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add an institution name'],
    },
    location: {
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
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    contactPerson: {
      type: String,
      required: [true, 'Please add a contact person'],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    description: {
      type: String,
    },
    operatingHours: {
      type: String,
    },
    bloodRequestsHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BloodRequest',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Institution', institutionSchema); 