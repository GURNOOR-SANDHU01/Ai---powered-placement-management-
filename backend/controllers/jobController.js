/*
  @author Gurnoor SINGH (102316101) 
*/
import Job from '../models/Job.js';
import Application from '../models/Application.js';

// @desc    Fetch all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'Active' }).populate('postedBy', 'name');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private/Recruiter
export const createJob = async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      postedBy: req.user._id,
    });

    const createdJob = await job.save();
    res.status(201).json(createdJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private/Student
export const applyForJob = async (req, res) => {
  try {
    const { jobId, resumeUrl } = req.body;

    const existingApplication = await Application.findOne({
      job: jobId,
      student: req.user._id,
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      student: req.user._id,
      resumeUrl,
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for user
// @route   GET /api/applications
// @access  Private
export const getApplications = async (req, res) => {
  try {
    let applications;
    
    if (req.user.role === 'Student') {
      applications = await Application.find({ student: req.user._id }).populate('job');
    } else if (req.user.role === 'Recruiter') {
      // Find jobs posted by this recruiter
      const jobs = await Job.find({ postedBy: req.user._id }).select('_id');
      const jobIds = jobs.map(j => j._id);
      
      applications = await Application.find({ job: { $in: jobIds } })
        .populate('job', 'title company')
        .populate('student', 'name email');
    }

    res.json(applications || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recruiter jobs
// @route   GET /api/jobs/recruiter
// @access  Private/Recruiter
export const getRecruiterJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    
    // For each job, count applicants (bonus)
    const jobsWithCounts = await Promise.all(jobs.map(async (job) => {
      const count = await Application.countDocuments({ job: job._id });
      return { ...job.toObject(), applicants: count };
    }));
    
    res.json(jobsWithCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update job status
// @route   PUT /api/jobs/:id/status
// @access  Private/Recruiter
export const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    
    job.status = status;
    await job.save();
    
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Recruiter
export const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id).populate('job');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if recruiter owns the job
    if (application.job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }
    
    application.status = status;
    await application.save();
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single application by ID
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('job')
      .populate('student', '-password');
      
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Authorization check
    if (req.user.role === 'Student' && application.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (req.user.role === 'Recruiter' && application.job.postedBy.toString() !== req.user._id.toString()) {
       return res.status(403).json({ message: 'Not authorized' });
    }
    
    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
