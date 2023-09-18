import * as mongoose from 'mongoose';

export const RideRequestSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['pending', 'accepted', 'completed', 'cancelled'],
    default: 'pending',
  },

  clientId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  driverId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  pickupLocation: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  destination: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
});
