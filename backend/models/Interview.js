/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';

const interviewSchema = new mongoose.Schema({
  application: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Application',
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  recruiter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // e.g. "10:00 AM - 11:00 AM"
    required: true,
  },
  type: {
    type: String,
    enum: ['Technical', 'HR', 'Managerial'],
    default: 'Technical',
  },
  meetingLink: {
    type: String,
  },
  status: {
    type: String,
    enum: ['upcoming', 'completed', 'cancelled'],
    default: 'upcoming',
  },
  result: {
    type: String,
    enum: ['passed', 'failed', 'pending'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

const Interview = mongoose.model('Interview', interviewSchema);

export default Interview;
