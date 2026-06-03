/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { getInterviews, scheduleInterview, updateInterview } from '../controllers/interviewController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getInterviews);
router.post('/', protect, authorize('Recruiter'), scheduleInterview);
router.put('/:id', protect, authorize('Recruiter', 'Admin'), updateInterview);

export default router;
