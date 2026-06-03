/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';

const placementDriveSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyWebsite: {
    type: String,
  },
  aboutCompany: {
    type: String,
  },
  rolesOffered: {
    type: [String],
    required: true,
  },
  ctcOffered: {
    type: String,
    required: true,
  },
  eligibility: {
    minCgpa: { type: Number, default: 0 },
    branches: [String],
    allowBacklogs: { type: Boolean, default: false },
  },
  registrationDeadline: {
    type: Date,
    required: true,
  },
  driveDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Registration Open', 'In Progress', 'Completed'],
    default: 'Registration Open',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const PlacementDrive = mongoose.model('PlacementDrive', placementDriveSchema);

export default PlacementDrive;
