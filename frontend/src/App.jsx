/*
  @author Gurnoor SINGH (102316101) 
*/
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';

// Layouts
import StudentLayout from './layouts/StudentLayout';
import RecruiterLayout from './layouts/RecruiterLayout';
import PlacementOfficerLayout from './layouts/PlacementOfficerLayout';

// Student Pages
import StudentDashboard from './pages/StudentDashboard';
import StudentProfilePage from './pages/student/StudentProfilePage';
import ResumeAnalysisPage from './pages/student/ResumeAnalysisPage';
import JobListingsPage from './pages/student/JobListingsPage';
import ApplicationTrackingPage from './pages/student/ApplicationTrackingPage';
import PlacementDrivesPage from './pages/student/PlacementDrivesPage';
import MockInterviewPage from './pages/student/MockInterviewPage';

// Recruiter Pages
import RecruiterDashboard from './pages/RecruiterDashboard';
import CreateJobPage from './pages/recruiter/CreateJobPage';
import ManageJobsPage from './pages/recruiter/ManageJobsPage';
import ApplicationsPage from './pages/recruiter/ApplicationsPage';
import CandidateDetailsPage from './pages/recruiter/CandidateDetailsPage';
import InterviewManagementPage from './pages/recruiter/InterviewManagementPage';

// Placement Officer Pages
import PlacementDashboard from './pages/officer/PlacementDashboard';
import CreatePlacementDrivePage from './pages/officer/CreatePlacementDrivePage';
import StudentTrackingPage from './pages/officer/StudentTrackingPage';
import ReportsPage from './pages/officer/ReportsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Student Routes */}
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfilePage />} />
            <Route path="resume" element={<ResumeAnalysisPage />} />
            <Route path="jobs" element={<JobListingsPage />} />
            <Route path="applications" element={<ApplicationTrackingPage />} />
            <Route path="drives" element={<PlacementDrivesPage />} />
            <Route path="mock-interview" element={<MockInterviewPage />} />
          </Route>

          {/* Recruiter Routes */}
          <Route path="/recruiter" element={<RecruiterLayout />}>
            <Route index element={<RecruiterDashboard />} />
            <Route path="create-job" element={<CreateJobPage />} />
            <Route path="manage-jobs" element={<ManageJobsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="candidate/:id" element={<CandidateDetailsPage />} />
            <Route path="interviews" element={<InterviewManagementPage />} />
          </Route>

          {/* Placement Officer Routes */}
          <Route path="/officer" element={<PlacementOfficerLayout />}>
            <Route index element={<PlacementDashboard />} />
            <Route path="create-drive" element={<CreatePlacementDrivePage />} />
            <Route path="student-tracking" element={<StudentTrackingPage />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
