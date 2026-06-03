/*
  @author Gurnoor SINGH (102316101) 
*/
import Interview from '../models/Interview.js';
import Application from '../models/Application.js';

// @desc    Get interviews for user
// @route   GET /api/interviews
// @access  Private
export const getInterviews = async (req, res) => {
  try {
    let interviews;
    if (req.user.role === 'Student') {
      interviews = await Interview.find({ candidate: req.user._id })
        .populate({ path: 'application', populate: { path: 'job', select: 'title company' } });
    } else if (req.user.role === 'Recruiter') {
      interviews = await Interview.find({ recruiter: req.user._id })
        .populate('candidate', 'name email')
        .populate({ path: 'application', populate: { path: 'job', select: 'title company' } });
    } else {
      interviews = await Interview.find()
        .populate('candidate', 'name')
        .populate('recruiter', 'name');
    }
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interviews' });
  }
};

// @desc    Schedule a new interview
// @route   POST /api/interviews
// @access  Private/Recruiter
export const scheduleInterview = async (req, res) => {
  try {
    const { applicationId, candidateId, date, time, type, meetingLink } = req.body;
    
    const interview = new Interview({
      application: applicationId,
      candidate: candidateId,
      recruiter: req.user._id,
      date,
      time,
      type,
      meetingLink,
    });

    const createdInterview = await interview.save();

    // Optionally update application status to 'Interview'
    await Application.findByIdAndUpdate(applicationId, { status: 'Interview' });

    res.status(201).json(createdInterview);
  } catch (error) {
    res.status(400).json({ message: 'Error scheduling interview', error: error.message });
  }
};

// @desc    Update interview status
// @route   PUT /api/interviews/:id
// @access  Private/Recruiter
export const updateInterview = async (req, res) => {
  try {
    const { status, result } = req.body;
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      { status, result },
      { new: true }
    );
    if (!interview) return res.status(404).json({ message: 'Interview not found' });
    res.json(interview);
  } catch (error) {
    res.status(400).json({ message: 'Error updating interview' });
  }
};
