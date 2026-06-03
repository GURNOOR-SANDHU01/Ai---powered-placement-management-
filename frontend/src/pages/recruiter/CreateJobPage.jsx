/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Briefcase, Building, MapPin, DollarSign, Target, Plus, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: 'Acme Corp',
    location: '',
    salary: '',
    jobType: 'Full-time',
    description: '',
  });
  const [skills, setSkills] = useState(['React', 'JavaScript']);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/jobs', {
        ...formData,
        requirements: skills,
        status: 'Active'
      });
      navigate('/recruiter/manage-jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Post a New Job</h1>
        <p className="text-muted-foreground mt-1">Create a new job listing to find your ideal candidate.</p>
      </div>

      {error && <div className="text-destructive font-medium p-4 bg-destructive/10 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Basic Details */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Basic Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Job Title</label>
                <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Senior Frontend Developer" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="Acme Corp" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input type="text" name="location" required value={formData.location} onChange={handleChange} className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. Bangalore or Remote" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Salary / Package (LPA)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <input type="text" name="salary" required value={formData.salary} onChange={handleChange} className="w-full pl-10 pr-3 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. 15-20 LPA" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Job Type</label>
                <select name="jobType" value={formData.jobType} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all">
                  <option value="Full-time">Full Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Contract">Contract</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Description</label>
              <textarea name="description" required value={formData.description} onChange={handleChange} rows="5" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="Describe the responsibilities and expectations..."></textarea>
            </div>
          </section>

          {/* Eligibility Criteria */}
          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <Target size={20} className="text-primary" /> Eligibility & Requirements
            </h2>
            
            <div className="space-y-4">
              <label className="text-sm font-medium block">Skills Required (Used for AI Matching)</label>
              
              <div className="flex flex-wrap gap-2 mb-2">
                {skills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-2">
                    {skill}
                    <button type="button" onClick={() => handleRemoveSkill(skill)} className="hover:text-destructive">&times;</button>
                  </span>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" 
                  placeholder="Type a skill and press Add..." 
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(e)}
                />
                <button type="button" onClick={handleAddSkill} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-1">
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          </section>
        </div>

        <div className="p-6 bg-secondary/50 border-t border-border flex justify-end gap-4">
          <button type="button" className="px-6 py-2.5 rounded-lg font-medium text-foreground hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70">
            {loading && <Loader2 size={16} className="animate-spin" />}
            Publish Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateJobPage;
