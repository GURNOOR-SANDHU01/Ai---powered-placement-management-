/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { getJobs, createJob, getRecruiterJobs, updateJobStatus } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getJobs)
  .post(protect, authorize('Recruiter'), createJob);

router.route('/recruiter')
  .get(protect, authorize('Recruiter'), getRecruiterJobs);

router.route('/:id/status')
  .put(protect, authorize('Recruiter'), updateJobStatus);

export default router;
