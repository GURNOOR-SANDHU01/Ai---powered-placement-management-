/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Applied', 'Online Assessment', 'Shortlisted', 'Interview', 'Selected', 'Rejected'],
    default: 'Applied',
  },
  matchScore: {
    type: Number,
    default: 0,
  },
  resumeUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;
