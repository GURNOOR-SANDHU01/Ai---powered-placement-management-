/*
  @author Gurnoor SINGH (102316101) 
*/
import { 
  Briefcase, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  Bell,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Student User!</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Profile Completion", value: "85%", icon: <TrendingUp className="text-primary" />, desc: "Looking good!" },
          { title: "Resume Score", value: "92/100", icon: <CheckCircle className="text-green-500" />, desc: "ATS Friendly" },
          { title: "Active Applications", value: "12", icon: <Briefcase className="text-blue-500" />, desc: "3 pending interviews" },
          { title: "Upcoming Drives", value: "4", icon: <Calendar className="text-amber-500" />, desc: "This week" }
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-secondary">{stat.icon}</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="font-medium text-foreground">{stat.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recommended for you</h2>
            <Link to="/student/jobs" className="text-sm font-medium text-primary flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { role: "Frontend Developer", company: "Google", location: "Bangalore", type: "Full-time", match: "95%" },
              { role: "Software Engineer", company: "Microsoft", location: "Hyderabad", type: "Full-time", match: "88%" },
              { role: "React Intern", company: "Zomato", location: "Gurugram", type: "Internship", match: "85%" },
              { role: "Full Stack Dev", company: "Amazon", location: "Remote", type: "Full-time", match: "82%" },
            ].map((job, i) => (
              <div key={i} className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{job.role}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-green-500/10 text-green-600 rounded-full">
                    {job.match} Match
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground">{job.location}</span>
                  <span className="text-xs font-medium px-2 py-1 bg-secondary rounded-md text-secondary-foreground">{job.type}</span>
                </div>
                <button className="w-full py-2 rounded-lg bg-primary/10 text-primary font-medium group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications & Upcoming */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Recent Notifications</h2>
              <button className="text-muted-foreground hover:text-foreground">
                <Bell size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {[
                { title: "Amazon Drive Announced", time: "2 hours ago", type: "drive" },
                { title: "Your resume score improved", time: "5 hours ago", type: "system" },
                { title: "Interview scheduled with Google", time: "1 day ago", type: "interview" },
              ].map((notif, i) => (
                <div key={i} className="flex gap-3 items-start pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${
                    notif.type === 'drive' ? 'bg-amber-500' : 
                    notif.type === 'interview' ? 'bg-blue-500' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{notif.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">Upcoming Drives</h2>
              <Link to="/student/drives" className="text-sm font-medium text-primary">View all</Link>
            </div>
            <div className="space-y-4">
              {[
                { company: "Atlassian", date: "Oct 15", package: "25 LPA" },
                { company: "Goldman Sachs", date: "Oct 18", package: "22 LPA" },
              ].map((drive, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="font-semibold text-sm">{drive.company}</p>
                    <p className="text-xs text-muted-foreground">{drive.date}</p>
                  </div>
                  <div className="text-sm font-medium text-primary">
                    {drive.package}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
