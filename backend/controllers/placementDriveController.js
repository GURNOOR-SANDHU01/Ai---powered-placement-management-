/*
  @author Gurnoor SINGH (102316101) 
*/
import PlacementDrive from '../models/PlacementDrive.js';

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
