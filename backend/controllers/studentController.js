/*
  @author Gurnoor SINGH (102316101) 
*/
import StudentProfile from '../models/StudentProfile.js';
import cloudinary from '../utils/cloudinary.js';

// @desc    Get logged in student profile
// @route   GET /api/student/profile
// @access  Private/Student
export const getStudentProfile = async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user: req.user._id }).populate('user', 'name email');
    
    if (!profile) {
      // Create empty profile if it doesn't exist
      profile = await StudentProfile.create({ user: req.user._id });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update student profile
// @route   PUT /api/student/profile
// @access  Private/Student
export const updateStudentProfile = async (req, res) => {
  try {
    let profile = await StudentProfile.findOne({ user: req.user._id });

    if (profile) {
      const updatedProfile = await StudentProfile.findOneAndUpdate(
        { user: req.user._id },
        { $set: req.body },
        { new: true }
      ).populate('user', 'name email');
      
      res.json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload resume
// @route   POST /api/student/resume
// @access  Private/Student
export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: 'auto',
      folder: 'resumes',
    });

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { user: req.user._id },
      { 'uploads.resume': result.secure_url },
      { new: true, upsert: true }
    );

    res.json({ url: result.secure_url, profile: updatedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload resume' });
  }
};

// @desc    Get all students
// @route   GET /api/student/all
// @access  Private/Officer
export const getAllStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find().populate('user', 'name email');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
