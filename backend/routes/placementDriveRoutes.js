/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { getPlacementDrives, createPlacementDrive, updatePlacementDrive, getPlacementReports } from '../controllers/placementDriveController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// NOTE: Specific routes (like /reports) must come before parameterized routes (like /:id)
router.get('/reports', protect, authorize('Officer', 'Admin'), getPlacementReports);
router.get('/', protect, getPlacementDrives);
router.post('/', protect, authorize('Officer', 'Admin'), createPlacementDrive);
router.put('/:id', protect, authorize('Officer', 'Admin'), updatePlacementDrive);

export default router;
