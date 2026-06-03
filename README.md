# CampusConnect AI - Placement Management Platform

CampusConnect AI is a comprehensive, AI-powered placement management platform built with the MERN stack (MongoDB, Express, React, Node.js). It streamlines the hiring process for universities by connecting students, recruiters, and placement officers in a single, unified ecosystem.

## 🚀 Features

### For Students
- **Smart Dashboard:** Track active applications, upcoming drives, and AI-recommended jobs.
- **AI Resume Analysis:** Get ATS scores and personalized feedback to improve your resume using Google Gemini AI.
- **Mock Interviews:** Practice technical interviews with an AI interviewer tailored to specific topics and difficulties.
- **Job Board & Tracking:** Discover and apply for opportunities, and track application statuses in real-time.

### For Recruiters
- **Candidate Matching:** Instantly rank applicants using AI based on job requirements and student profiles.
- **Job Management:** Post and manage job openings and internships.
- **Interview Scheduling:** Organize and manage candidate interviews directly within the platform.
- **Application Tracking:** Seamlessly move candidates through the hiring pipeline (Applied -> Shortlisted -> Interview -> Selected).

### For Placement Officers (Admins)
- **Placement Drives:** Create and announce campus placement drives.
- **Student Tracking:** Monitor the placement status of all registered students, filterable by branch and academic performance.
- **Analytics & Reports:** Generate comprehensive reports on branch-wise, company-wise, and overall placement statistics.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, Lucide React (Icons), React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **AI Integration:** Google Gemini API (gemini-2.5-flash) for Resume Analysis, Candidate Matching, and Mock Interviews.
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

## ⚙️ Installation & Setup

Follow these steps to run the project locally.

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/campusconnect-ai.git
cd campusconnect-ai
```

### 2. Setup Environment Variables
Navigate to the `backend` directory and create a `.env` file based on your configuration:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
NODE_ENV=development
```

### 3. Install Dependencies
Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Seed the Database
To quickly populate your database with sample data (Students, Recruiters, Jobs, Applications, and a Placement Officer), run the seeder script from the `backend` directory:
```bash
cd backend
node seed.js
```

### 5. Run the Application

#### Development Mode (Running Backend and Frontend Separately)

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

#### Production Mode (Serving Frontend from Backend)
First, build the frontend:
```bash
cd frontend
npm run build
```
Then start the backend server in production mode:
```bash
cd ../backend
export NODE_ENV=production
npm start
```
The application will be running at `http://localhost:8000`.

## 🧪 Test Accounts

If you ran the `seed.js` script, you can log in with the following accounts. The password for all test accounts is **`password123`**.

- **Admin/Officer:** `officer@campusconnect.com`
- **Recruiter:** `recruiter1@google.com`, `recruiter2@microsoft.com`
- **Student:** `student1@example.com`, `student2@example.com`

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a Pull Request.
