/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { getStudentProfile, updateStudentProfile, uploadResume, getAllStudents } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/profile', protect, authorize('Student'), getStudentProfile);
router.put('/profile', protect, authorize('Student'), updateStudentProfile);
router.post('/resume', protect, authorize('Student'), upload.single('resume'), uploadResume);

router.get('/all', protect, authorize('Placement Officer'), getAllStudents);

export default router;
