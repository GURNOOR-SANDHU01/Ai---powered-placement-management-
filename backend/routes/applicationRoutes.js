/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { applyForJob, getApplications, updateApplicationStatus, getApplicationById } from '../controllers/jobController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, applyForJob)
  .get(protect, getApplications);

router.route('/:id')
  .get(protect, getApplicationById);

router.route('/:id/status')
  .put(protect, authorize('Recruiter'), updateApplicationStatus);

export default router;
