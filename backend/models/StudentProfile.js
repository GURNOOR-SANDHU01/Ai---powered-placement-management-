/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  phone: String,
  dob: Date,
  gender: String,
  currentAddress: String,
  permanentAddress: String,
  academic: {
    college: String,
    degree: String,
    branch: String,
    cgpa: Number,
    passingYear: Number,
  },
  skills: [String],
  certifications: [String],
  projects: [{
    title: String,
    description: String,
    githubLink: String,
    demoLink: String,
    techStack: [String],
  }],
  experience: [{
    title: String,
    company: String,
    description: String,
  }],
  socialLinks: {
    linkedIn: String,
    github: String,
    portfolio: String,
  },
  uploads: {
    profilePicture: String,
    bannerImage: String,
    resume: String,
  },
}, {
  timestamps: true,
});

const StudentProfile = mongoose.model('StudentProfile', studentProfileSchema);

export default StudentProfile;
