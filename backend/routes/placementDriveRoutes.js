/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import { getPlacementDrives, createPlacementDrive, updatePlacementDrive } from '../controllers/placementDriveController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getPlacementDrives);
router.post('/', protect, authorize('Officer', 'Admin'), createPlacementDrive);
router.put('/:id', protect, authorize('Officer', 'Admin'), updatePlacementDrive);

export default router;
