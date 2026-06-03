/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { 
  analyzeResume, 
  matchCandidateToJob, 
  generateInterviewQuestion, 
  evaluateInterviewAnswer 
} from '../controllers/aiController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Resume Analysis is for Students
router.post('/analyze-resume', protect, authorize('Student'), analyzeResume);

// Match Candidate is for Recruiters
router.post('/match-candidate', protect, authorize('Recruiter'), matchCandidateToJob);

// Mock Interviews are for Students
router.post('/interview/question', protect, authorize('Student'), generateInterviewQuestion);
router.post('/interview/evaluate', protect, authorize('Student'), evaluateInterviewAnswer);

export default router;
