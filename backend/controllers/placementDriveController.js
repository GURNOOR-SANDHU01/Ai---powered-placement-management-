/*
  @author Gurnoor SINGH (102316101) 
*/
import PlacementDrive from '../models/PlacementDrive.js';
import Application from '../models/Application.js';
import StudentProfile from '../models/StudentProfile.js';

// @desc    Get all placement drives
// @route   GET /api/placement-drives
// @access  Private
export const getPlacementDrives = async (req, res) => {
  try {
    const drives = await PlacementDrive.find().sort({ createdAt: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching placement drives' });
  }
};

// @desc    Create a new placement drive
// @route   POST /api/placement-drives
// @access  Private/Officer
export const createPlacementDrive = async (req, res) => {
  try {
    const drive = new PlacementDrive({
      ...req.body,
      createdBy: req.user._id,
    });
    const createdDrive = await drive.save();
    res.status(201).json(createdDrive);
  } catch (error) {
    res.status(400).json({ message: 'Error creating placement drive', error: error.message });
  }
};

// @desc    Update a placement drive
// @route   PUT /api/placement-drives/:id
// @access  Private/Officer
export const updatePlacementDrive = async (req, res) => {
  try {
    const updatedDrive = await PlacementDrive.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedDrive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.json(updatedDrive);
  } catch (error) {
    res.status(400).json({ message: 'Error updating placement drive' });
  }
};

// @desc    Get placement reports
// @route   GET /api/placement-drives/reports
// @access  Private/Officer
export const getPlacementReports = async (req, res) => {
  try {
    const totalStudents = await StudentProfile.countDocuments();
    
    // Calculate Branch-wise Report
    const students = await StudentProfile.find({}, 'academic.branch');
    const branchStats = {};
    students.forEach(s => {
      const branch = s.academic?.branch || 'Unknown';
      branchStats[branch] = (branchStats[branch] || 0) + 1;
    });

    // Calculate Company-wise Report
    const selectedApplications = await Application.find({ status: 'Selected' }).populate('job', 'company');
    const companyStats = {};
    selectedApplications.forEach(app => {
      const company = app.job?.company || 'Unknown';
      companyStats[company] = (companyStats[company] || 0) + 1;
    });

    // Calculate Overall Report
    const totalPlaced = await Application.distinct('student', { status: 'Selected' });
    const placementRate = totalStudents > 0 ? ((totalPlaced.length / totalStudents) * 100).toFixed(1) : 0;

    res.json({
      totalStudents,
      totalPlaced: totalPlaced.length,
      placementRate,
      branchStats,
      companyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating reports', error: error.message });
  }
};
