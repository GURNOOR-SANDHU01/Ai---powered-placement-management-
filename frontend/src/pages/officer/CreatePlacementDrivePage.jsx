/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Calendar, Building, Briefcase, GraduationCap, Check, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreatePlacementDrivePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    aboutCompany: '',
    rolesOffered: '',
    ctcOffered: '',
    minCgpa: '',
    branches: '',
    allowBacklogs: false,
    registrationDeadline: '',
    driveDate: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        aboutCompany: formData.aboutCompany,
        rolesOffered: formData.rolesOffered.split(',').map(r => r.trim()),
        ctcOffered: formData.ctcOffered,
        eligibility: {
          minCgpa: Number(formData.minCgpa) || 0,
          branches: formData.branches.split(',').map(b => b.trim()),
          allowBacklogs: formData.allowBacklogs
        },
        registrationDeadline: formData.registrationDeadline,
        driveDate: formData.driveDate,
        status: 'Registration Open'
      };

      await api.post('/placement-drives', payload);
      navigate('/officer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create placement drive');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organize Placement Drive</h1>
        <p className="text-muted-foreground mt-1">Set up a new campus recruitment drive for students.</p>
      </div>

      {error && <div className="text-destructive font-medium p-4 bg-destructive/10 rounded-lg">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 space-y-8">
          
          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <Building size={20} className="text-primary" /> Company Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                <input required name="companyName" value={formData.companyName} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="e.g. Google India" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Company Website</label>
                <input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} type="url" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" placeholder="https://careers.google.com" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">About Company</label>
                <textarea name="aboutCompany" value={formData.aboutCompany} onChange={handleChange} rows="3" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="Brief description of the company..."></textarea>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <Briefcase size={20} className="text-primary" /> Package & Roles
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Roles Offered (comma separated)</label>
                <input required name="rolesOffered" value={formData.rolesOffered} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. SDE, Data Analyst" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">CTC Offered (LPA)</label>
                <input required name="ctcOffered" value={formData.ctcOffered} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. 15-20" />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <GraduationCap size={20} className="text-primary" /> Eligibility Criteria
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum CGPA</label>
                <input name="minCgpa" value={formData.minCgpa} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. 7.5" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Eligible Branches (comma separated)</label>
                <input name="branches" value={formData.branches} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" placeholder="e.g. CS, IT, ECE" />
              </div>

              <div className="space-y-2 md:col-span-2 flex items-center gap-2">
                <input name="allowBacklogs" checked={formData.allowBacklogs} onChange={handleChange} type="checkbox" id="backlogs" className="w-4 h-4 rounded text-primary focus:ring-primary border-border" />
                <label htmlFor="backlogs" className="text-sm font-medium cursor-pointer">Allow active backlogs</label>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-lg font-bold border-b border-border pb-2 flex items-center gap-2">
              <Calendar size={20} className="text-primary" /> Drive Schedule
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Registration Deadline</label>
                <input required name="registrationDeadline" value={formData.registrationDeadline} onChange={handleChange} type="date" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Drive Date</label>
                <input required name="driveDate" value={formData.driveDate} onChange={handleChange} type="date" className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary transition-all" />
              </div>
            </div>
          </section>

        </div>

        <div className="p-6 bg-secondary/50 border-t border-border flex justify-end gap-4">
          <button type="button" onClick={() => navigate('/officer/dashboard')} className="px-6 py-2.5 rounded-lg font-medium text-foreground hover:bg-secondary transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-70">
            {loading && <Loader2 size={16} className="animate-spin" />}
            <Check size={18} /> Publish Drive
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlacementDrivePage;
