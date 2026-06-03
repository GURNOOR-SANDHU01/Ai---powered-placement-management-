/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, DollarSign, Briefcase, Star, Clock, CheckCircle } from 'lucide-react';
import api from '../../services/api';

const JobListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingTo, setApplyingTo] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
    fetchAppliedJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/jobs');
      setJobs(data);
    } catch (err) {
      setError('Failed to fetch jobs.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await api.get('/applications');
      // Store IDs of jobs the student has already applied to
      const appliedIds = new Set(data.map(app => app.job._id || app.job));
      setAppliedJobs(appliedIds);
    } catch (err) {
      console.error('Failed to fetch applications', err);
    }
  };

  const handleApply = async (jobId) => {
    try {
      setApplyingTo(jobId);
      await api.post('/applications', { jobId, resumeUrl: '' });
      setAppliedJobs(prev => new Set(prev).add(jobId));
    } catch (err) {
      alert(err.response?.data?.message || 'Error applying for job');
    } finally {
      setApplyingTo(null);
    }
  };

  // Filter jobs locally
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Opportunities</h1>
          <p className="text-muted-foreground mt-1">Find and apply for the best roles tailored to your profile.</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-card rounded-2xl border border-border shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search for roles, companies, or keywords..." 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="md:w-auto px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
            <Search size={18} />
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Location</label>
            <select className="w-full p-2 rounded-lg border border-border bg-background text-sm">
              <option>Any Location</option>
              <option>Bangalore</option>
              <option>Hyderabad</option>
              <option>Gurugram</option>
              <option>Remote</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Salary Expectation</label>
            <select className="w-full p-2 rounded-lg border border-border bg-background text-sm">
              <option>Any Salary</option>
              <option>10-15 LPA</option>
              <option>15-20 LPA</option>
              <option>20+ LPA</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Skills</label>
            <select className="w-full p-2 rounded-lg border border-border bg-background text-sm">
              <option>All Skills</option>
              <option>React</option>
              <option>Node.js</option>
              <option>Python</option>
              <option>Java</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">Job Type</label>
            <select className="w-full p-2 rounded-lg border border-border bg-background text-sm">
              <option>All Types</option>
              <option>Full-time</option>
              <option>Internship</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="text-destructive text-center p-4">{error}</div>}

      {/* Job List */}
      {loading ? (
        <div className="text-center p-12 text-muted-foreground">Loading jobs...</div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{filteredJobs.length} jobs found</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter size={16} />
              <span>Sort by:</span>
              <select className="bg-transparent border-none font-medium text-foreground focus:ring-0 cursor-pointer">
                <option>Recent</option>
                <option>Match Score</option>
                <option>Salary (High to Low)</option>
              </select>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
              No active jobs found. Try adjusting your search.
            </div>
          ) : (
            filteredJobs.map((job) => {
              const hasApplied = appliedJobs.has(job._id);
              
              return (
                <div key={job._id} className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-medium text-foreground">{job.company}</span>
                          <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock size={14} /> {new Date(job.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={16} />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Briefcase size={16} />
                        {job.jobType}
                      </div>
                      <div className="flex items-center gap-1.5 text-foreground font-medium">
                        <DollarSign size={16} />
                        {job.salary}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {job.requirements?.map((skill, index) => (
                        <span key={index} className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 md:w-32 shrink-0">
                    <button 
                      onClick={() => handleApply(job._id)}
                      disabled={hasApplied || applyingTo === job._id}
                      className={`w-full py-2.5 font-medium rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 ${
                        hasApplied 
                          ? 'bg-green-500/10 text-green-600 cursor-default' 
                          : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-70'
                      }`}
                    >
                      {hasApplied ? <><CheckCircle size={16}/> Applied</> : (applyingTo === job._id ? 'Applying...' : 'Apply Now')}
                    </button>
                    <button className="w-full py-2.5 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors">
                      Save Job
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;
