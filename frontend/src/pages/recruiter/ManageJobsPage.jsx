/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, PauseCircle, PlayCircle, Eye, Users, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageJobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/jobs/recruiter');
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (jobId, currentStatus) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
      await api.put(`/jobs/${jobId}/status`, { status: newStatus });
      setJobs(jobs.map(job => job._id === jobId ? { ...job, status: newStatus } : job));
    } catch (err) {
      alert('Failed to update job status');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Jobs</h1>
          <p className="text-muted-foreground mt-1">View, edit, and manage all your posted job listings.</p>
        </div>
        <Link to="/recruiter/create-job" className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm">
          Post New Job
        </Link>
      </div>

      {error && <div className="text-destructive font-medium bg-destructive/10 p-4 rounded-lg">{error}</div>}

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row justify-between gap-4 bg-secondary/30">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by job title or location..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
              <Filter size={16} /> Filter
            </button>
            <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary">
              <option>All Status</option>
              <option>Active</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center p-12 text-muted-foreground flex justify-center items-center gap-2">
              <Loader2 className="animate-spin" /> Loading jobs...
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Job Title</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Applicants</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Posted Date</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-muted-foreground">
                      No jobs found.
                    </td>
                  </tr>
                ) : filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-secondary/30 transition-colors group">
                    <td className="p-4">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{job.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{job.jobType} • {job.location}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        job.status === 'Active' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        'bg-secondary text-muted-foreground border-border'
                      }`}>
                        {job.status || 'Active'}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link to="/recruiter/applications" className="flex items-center gap-1.5 text-primary font-medium hover:underline">
                        <Users size={16} />
                        {job.applicants || 0}
                      </Link>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Details">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="Edit Job">
                          <Edit size={18} />
                        </button>
                        {job.status === 'Active' ? (
                          <button 
                            onClick={() => handleStatusToggle(job._id, job.status)}
                            className="p-2 text-muted-foreground hover:text-amber-500 hover:bg-amber-500/10 rounded-lg transition-all" title="Close Job">
                            <PauseCircle size={18} />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleStatusToggle(job._id, job.status)}
                            className="p-2 text-muted-foreground hover:text-green-500 hover:bg-green-500/10 rounded-lg transition-all" title="Activate Job">
                            <PlayCircle size={18} />
                          </button>
                        )}
                        <button className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all" title="Delete Job">
                          <Trash2 size={18} />
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
          <span>Showing {filteredJobs.length} entries</span>
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

export default ManageJobsPage;
