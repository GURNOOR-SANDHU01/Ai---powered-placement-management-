/*
  @author Gurnoor SINGH (102316101) 
*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import StudentProfile from './models/StudentProfile.js';
import Job from './models/Job.js';
import Application from './models/Application.js';
import PlacementDrive from './models/PlacementDrive.js';
import Interview from './models/Interview.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await StudentProfile.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();
    await PlacementDrive.deleteMany();
    await Interview.deleteMany();

    const createdUsers = await User.insertMany([
      { name: 'Admin', email: 'admin@campusconnect.com', password: 'password123', role: 'Admin' },
      { name: 'Placement Officer', email: 'officer@campusconnect.com', password: 'password123', role: 'Placement Officer' },
      { name: 'Google Recruiter', email: 'recruiter1@google.com', password: 'password123', role: 'Recruiter' },
      { name: 'Microsoft Recruiter', email: 'recruiter2@microsoft.com', password: 'password123', role: 'Recruiter' },
      { name: 'Amazon Recruiter', email: 'recruiter3@amazon.com', password: 'password123', role: 'Recruiter' },
      { name: 'John Doe', email: 'student1@example.com', password: 'password123', role: 'Student' },
      { name: 'Jane Smith', email: 'student2@example.com', password: 'password123', role: 'Student' },
      { name: 'Alice Johnson', email: 'student3@example.com', password: 'password123', role: 'Student' },
    ]);

    console.log('Users inserted!');

    const recruiters = createdUsers.filter((u) => u.role === 'Recruiter');
    const students = createdUsers.filter((u) => u.role === 'Student');
    const officer = createdUsers.find((u) => u.role === 'Placement Officer');

    // Student Profiles
    await StudentProfile.insertMany([
      {
        user: students[0]._id,
        phone: '1234567890',
        dob: new Date('2000-01-01'),
        gender: 'Male',
        currentAddress: 'Bangalore, India',
        permanentAddress: 'Delhi, India',
        academic: { college: 'IIT Bombay', degree: 'B.Tech', branch: 'Computer Science', cgpa: 9.2, passingYear: 2024 },
        skills: ['React', 'Node.js', 'MongoDB', 'Python'],
      },
      {
        user: students[1]._id,
        phone: '9876543210',
        dob: new Date('2001-05-15'),
        gender: 'Female',
        currentAddress: 'Hyderabad, India',
        permanentAddress: 'Mumbai, India',
        academic: { college: 'NIT Trichy', degree: 'B.Tech', branch: 'Information Technology', cgpa: 8.8, passingYear: 2024 },
        skills: ['Java', 'Spring Boot', 'SQL', 'AWS'],
      },
      {
        user: students[2]._id,
        phone: '5555555555',
        dob: new Date('2000-11-20'),
        gender: 'Female',
        currentAddress: 'Chennai, India',
        permanentAddress: 'Chennai, India',
        academic: { college: 'BITS Pilani', degree: 'B.Tech', branch: 'Electronics', cgpa: 8.5, passingYear: 2024 },
        skills: ['C++', 'Python', 'Machine Learning', 'TensorFlow'],
      },
    ]);

    console.log('Student Profiles inserted!');

    const createdJobs = await Job.insertMany([
      {
        title: 'Software Engineer',
        company: 'Google',
        description: 'Join Google as a Software Engineer.',
        salary: '35 LPA',
        location: 'Bangalore',
        jobType: 'Full-time',
        requirements: ['React', 'Node.js', 'System Design'],
        eligibility: { minCgpa: 8.0, skillsRequired: ['React', 'Node.js'], passingYear: [2024] },
        postedBy: recruiters[0]._id,
      },
      {
        title: 'Backend Developer',
        company: 'Microsoft',
        description: 'Build scalable backend services at Microsoft.',
        salary: '30 LPA',
        location: 'Hyderabad',
        jobType: 'Full-time',
        requirements: ['Java', 'Spring Boot', 'SQL'],
        eligibility: { minCgpa: 7.5, skillsRequired: ['Java', 'SQL'], passingYear: [2024] },
        postedBy: recruiters[1]._id,
      },
      {
        title: 'Data Scientist Internship',
        company: 'Amazon',
        description: 'Intern with the data science team.',
        salary: '1 Lakh/month',
        location: 'Remote',
        jobType: 'Internship',
        requirements: ['Python', 'Machine Learning', 'SQL'],
        eligibility: { minCgpa: 8.5, skillsRequired: ['Python', 'Machine Learning'], passingYear: [2024, 2025] },
        postedBy: recruiters[2]._id,
      },
    ]);

    console.log('Jobs inserted!');

    await Application.insertMany([
      { job: createdJobs[0]._id, student: students[0]._id, status: 'Applied', matchScore: 92 },
      { job: createdJobs[1]._id, student: students[1]._id, status: 'Shortlisted', matchScore: 88 },
      { job: createdJobs[2]._id, student: students[2]._id, status: 'Interview', matchScore: 95 },
    ]);

    console.log('Applications inserted!');

    await PlacementDrive.insertMany([
      {
        companyName: 'Atlassian',
        aboutCompany: 'Hiring SDE 1 and SDE 2',
        rolesOffered: ['Software Engineer'],
        ctcOffered: '25 LPA',
        eligibility: { minCgpa: 8.0, branches: ['Computer Science', 'Information Technology'], allowBacklogs: false },
        registrationDeadline: new Date('2024-10-10'),
        driveDate: new Date('2024-10-15'),
        status: 'Registration Open',
        createdBy: officer._id,
      },
      {
        companyName: 'Goldman Sachs',
        aboutCompany: 'Hiring Analysts',
        rolesOffered: ['Analyst'],
        ctcOffered: '22 LPA',
        eligibility: { minCgpa: 7.5, branches: [], allowBacklogs: false },
        registrationDeadline: new Date('2024-10-12'),
        driveDate: new Date('2024-10-18'),
        status: 'Registration Open',
        createdBy: officer._id,
      },
    ]);

    console.log('Placement Drives inserted!');

    console.log('Data Import Success');
    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
