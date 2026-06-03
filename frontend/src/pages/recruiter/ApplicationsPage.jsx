/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Search, Filter, Download, Star, CheckCircle, XCircle, Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ApplicationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/applications');
      setApplications(data);
    } catch (err) {
      setError('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await api.put(`/applications/${appId}/status`, { status: newStatus });
      setApplications(applications.map(app => 
        app._id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredApps = applications.filter(app => 
    app.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground mt-1">Review candidates and manage the hiring pipeline.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      {error && <div className="text-destructive font-medium bg-destructive/10 p-4 rounded-lg">{error}</div>}

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 bg-secondary/30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, college, or skills..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Applicants Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center p-12 text-muted-foreground flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" /> Loading applications...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Candidate Info</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Applied Role</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">AI Match</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredApps.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-muted-foreground">
                      No applications found.
                    </td>
                  </tr>
                ) : filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-secondary/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 border border-primary/20">
                          {app.student?.name?.[0] || 'U'}
                        </div>
                        <div>
                          <Link to={`/recruiter/candidate/${app._id}`} className="font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                            {app.student?.name} <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <p className="text-xs text-muted-foreground mt-0.5">{app.student?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-sm">{app.job?.title}</p>
                      <p className="text-xs text-muted-foreground">{new Date(app.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <Star size={16} className={app.aiMatchScore > 80 ? "fill-green-500 text-green-500" : "fill-amber-500 text-amber-500"} />
                        <span className="font-semibold text-sm">{app.aiMatchScore || 'Pending'}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        app.status === 'Applied' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        app.status === 'Shortlisted' || app.status === 'Selected' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        app.status === 'Interview' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        'bg-destructive/10 text-destructive border-destructive/20'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleUpdateStatus(app._id, 'Shortlisted')} className="p-2 text-muted-foreground hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-all border border-transparent hover:border-green-500/20" title="Shortlist">
                          <CheckCircle size={18} />
                        </button>
                        <button onClick={() => handleUpdateStatus(app._id, 'Interview')} className="p-2 text-muted-foreground hover:text-amber-600 hover:bg-amber-500/10 rounded-lg transition-all border border-transparent hover:border-amber-500/20" title="Schedule Interview">
                          <Calendar size={18} />
                        </button>
                        <button onClick={() => handleUpdateStatus(app._id, 'Rejected')} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all border border-transparent hover:border-destructive/20" title="Reject">
                          <XCircle size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination Dummy */}
        <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground bg-card">
          <span>Showing {filteredApps.length} applicants</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded-md bg-secondary hover:bg-border transition-colors disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded-md bg-primary text-primary-foreground font-medium">1</button>
            <button className="px-3 py-1 rounded-md bg-secondary hover:bg-border transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
