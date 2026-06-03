/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const seedOfficer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');

    // Check if officer already exists
    const existing = await User.findOne({ email: 'officer@campusconnect.com' });
    if (existing) {
      console.log('Placement Officer already exists:');
      console.log('  Email: officer@campusconnect.com');
      console.log('  Password: officer123');
      process.exit(0);
    }

    const officer = await User.create({
      name: 'Placement Officer',
      email: 'officer@campusconnect.com',
      password: 'officer123',
      role: 'Placement Officer',
    });

    console.log('✅ Placement Officer account created successfully!');
    console.log('  Name:', officer.name);
    console.log('  Email: officer@campusconnect.com');
    console.log('  Password: officer123');
    console.log('  Role:', officer.role);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

seedOfficer();
