/*
  @author Gurnoor SINGH (102316101) 
*/
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import placementDriveRoutes from './routes/placementDriveRoutes.js';
import interviewRoutes from './routes/interviewRoutes.js';
import aiRoutes from './routes/aiRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/placement-drives', placementDriveRoutes);
app.use('/api/interviews', interviewRoutes);
app.use('/api/ai', aiRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.use((req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
