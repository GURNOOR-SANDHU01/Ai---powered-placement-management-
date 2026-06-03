/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  BarChart, 
  TrendingUp,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const PlacementDashboard = () => {
  const [drives, setDrives] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      const [drivesRes, reportsRes] = await Promise.all([
        api.get('/placement-drives'),
        api.get('/placement-drives/reports')
      ]);
      setDrives(drivesRes.data);
      setReportData(reportsRes.data);
    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of the campus placement statistics and ongoing drives.</p>
        </div>
        <Link to="/officer/create-drive" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          New Drive
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Students", value: reportData?.totalStudents || 0, icon: <Users className="text-blue-500" />, desc: "Registered this year" },
          { title: "Placed Students", value: reportData?.totalPlaced || 0, icon: <UserCheck className="text-green-500" />, desc: "Offers rolled out" },
          { title: "Active Drives", value: drives.filter(d => d.status !== 'Completed').length || 0, icon: <Calendar className="text-amber-500" />, desc: "Currently ongoing" },
          { title: "Placement %", value: `${reportData?.placementRate || 0}%`, icon: <BarChart className="text-primary" />, desc: "Target: 95%" }
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
        {/* Recent Updates */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Drive Updates</h2>
            <Link to="/officer/reports" className="text-sm font-medium text-primary flex items-center gap-1">
              View reports <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center p-8 text-muted-foreground"><Loader2 className="animate-spin" /></div>
            ) : drives.length === 0 ? (
              <div className="text-center p-8 text-muted-foreground border border-border rounded-xl border-dashed">No drives found.</div>
            ) : drives.slice(0, 4).map((drive) => (
              <div key={drive._id} className="p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-muted-foreground shrink-0 border border-border uppercase">
                    {drive.companyName?.[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold">{drive.companyName}</h3>
                    <p className="text-sm text-muted-foreground">{drive.rolesOffered?.join(', ')}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 sm:justify-end">
                  <div className="text-sm text-muted-foreground hidden md:block">{new Date(drive.driveDate).toLocaleDateString()}</div>
                  <div className="text-center px-3 py-1 bg-secondary rounded-lg">
                    <span className="text-xs text-muted-foreground block leading-none mb-1">Status</span>
                    <span className="font-medium text-sm">{drive.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Upcoming */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <div className="space-y-2">
              <Link to="/officer/create-drive" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Organize New Drive</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/officer/student-tracking" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Track Students</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
              <Link to="/officer/reports" className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group">
                <span className="font-medium group-hover:text-primary transition-colors">Generate Reports</span>
                <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-sm">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-bold mb-1">Insights</h3>
                <p className="text-sm text-muted-foreground">
                  The Computer Science branch has seen a 15% increase in average package compared to last year. Core branches need more focus drives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementDashboard;
