/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Internship', 'Contract', 'Part-time'],
    default: 'Full-time',
  },
  requirements: {
    type: [String],
    default: [],
  },
  eligibility: {
    minCgpa: { type: Number, default: 0 },
    skillsRequired: [String],
    passingYear: [Number],
  },
  hiringProcess: {
    type: [String],
    default: ['OA', 'Technical', 'HR'],
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Paused', 'Closed'],
    default: 'Active',
  },
}, {
  timestamps: true,
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
