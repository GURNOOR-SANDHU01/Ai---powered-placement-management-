/*
  @author Gurnoor SINGH (102316101) 
*/
import { 
  Briefcase, 
  Users, 
  UserCheck, 
  Calendar, 
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RecruiterDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recruiter Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your hiring process and active drives.</p>
        </div>
        <Link to="/recruiter/create-job" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          Post New Job
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Jobs", value: "8", icon: <Briefcase className="text-blue-500" />, desc: "Across 3 branches" },
          { title: "Total Applications", value: "452", icon: <Users className="text-primary" />, desc: "+24 today" },
          { title: "Shortlisted", value: "64", icon: <UserCheck className="text-green-500" />, desc: "14% of total" },
          { title: "Interviews Scheduled", value: "28", icon: <Calendar className="text-amber-500" />, desc: "Next 7 days" }
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
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Top Matches</h2>
            <Link to="/recruiter/applications" className="text-sm font-medium text-primary flex items-center gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {[
              { name: "Aditya Sharma", role: "Frontend Developer", college: "IIT Bombay", cgpa: "9.2", match: "98%" },
              { name: "Priya Patel", role: "Software Engineer", college: "NIT Trichy", cgpa: "8.9", match: "95%" },
              { name: "Rohan Gupta", role: "Backend Developer", college: "BITS Pilani", cgpa: "8.5", match: "92%" },
              { name: "Neha Singh", role: "Data Scientist", college: "IIIT Hyderabad", cgpa: "9.0", match: "90%" },
            ].map((app, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                    {app.name[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.role} • {app.college}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:justify-end">
                  <div className="text-center px-3 py-1 bg-secondary rounded-lg">
                    <span className="text-xs text-muted-foreground block leading-none mb-1">CGPA</span>
                    <span className="font-semibold text-sm">{app.cgpa}</span>
                  </div>
                  <div className="text-center px-3 py-1 bg-green-500/10 text-green-600 rounded-lg">
                    <span className="text-xs font-medium block leading-none mb-1">AI Match</span>
                    <span className="font-semibold text-sm">{app.match}</span>
                  </div>
                  <Link to={`/recruiter/candidate/${i}`} className="p-2 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/recruiter/create-job" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Post a new job</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/recruiter/manage-jobs" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Manage active jobs</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/recruiter/interviews" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Schedule interviews</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-sm">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold mb-1">AI Hiring Insights</h3>
                <p className="text-sm text-muted-foreground">
                  The requirement for "React" skills has increased by 40% among candidates applying for Frontend roles. Consider adding it as a mandatory skill.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
