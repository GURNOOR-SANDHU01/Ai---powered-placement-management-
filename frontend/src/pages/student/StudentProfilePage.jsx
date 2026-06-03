/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Camera, Upload, Save, User, BookOpen, Award, Briefcase, Link as LinkIcon, FileText } from 'lucide-react';
import api from '../../services/api';

const StudentProfilePage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState({
    user: { name: '', email: '' },
    phone: '',
    dob: '',
    gender: '',
    currentAddress: '',
    permanentAddress: '',
    academic: { college: '', degree: '', branch: '', passingYear: '', cgpa: '', twelfthPercent: '' },
    skills: [],
    links: { linkedin: '', github: '', portfolio: '' },
    uploads: { resume: '', profilePicture: '' },
    projects: [],
    experience: [],
    certifications: []
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [resumeFile, setResumeFile] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/student/profile');
      if (data) {
        setProfile(prev => ({
          ...prev,
          ...data,
          academic: data.academic || prev.academic,
          links: data.links || prev.links,
          uploads: data.uploads || prev.uploads,
          dob: data.dob ? data.dob.substring(0, 10) : ''
        }));
      }
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');
      const { data } = await api.put('/student/profile', profile);
      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section, field, value) => {
    setProfile(prev => {
      if (section) {
        return { ...prev, [section]: { ...prev[section], [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      setUploadingResume(true);
      const { data } = await api.post('/student/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(prev => ({
        ...prev,
        uploads: { ...prev.uploads, resume: data.url }
      }));
      setSuccess('Resume uploaded successfully!');
    } catch (err) {
      setError('Failed to upload resume');
    } finally {
      setUploadingResume(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: <User size={16} /> },
    { id: 'academic', label: 'Academic', icon: <BookOpen size={16} /> },
    { id: 'skills', label: 'Skills & Certs', icon: <Award size={16} /> },
    { id: 'projects', label: 'Projects & Exp', icon: <Briefcase size={16} /> },
    { id: 'social', label: 'Links & Docs', icon: <LinkIcon size={16} /> },
  ];

  if (loading) return <div className="p-8 text-center">Loading profile...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your Profile</h1>
          <p className="text-muted-foreground mt-1">Complete your profile to increase your chances of getting shortlisted.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm disabled:opacity-70"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-3 rounded">{error}</div>}
      {success && <div className="bg-green-500/10 text-green-600 p-3 rounded">{success}</div>}

      {/* Banner & Avatar */}
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border shadow-sm">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 relative group cursor-pointer"></div>
        
        <div className="px-6 pb-6 pt-16 relative">
          <div className="absolute -top-16 left-6 w-32 h-32 rounded-full border-4 border-card bg-secondary overflow-hidden group cursor-pointer">
            <img src={profile.uploads?.profilePicture || "https://i.pravatar.cc/150?img=33"} alt="Profile" className="w-full h-full object-cover" />
          </div>
          
          <div className="ml-36">
            <h2 className="text-2xl font-bold">{profile.user?.name}</h2>
            <p className="text-muted-foreground">{profile.academic?.degree || 'Student'} • {profile.academic?.branch || 'Branch'} • Class of {profile.academic?.passingYear || 'Year'}</p>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1 bg-card rounded-xl p-2 border border-border shadow-sm sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <div className="bg-card rounded-xl border border-border shadow-sm p-6 md:p-8">
            
            {activeTab === 'personal' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-border pb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <input type="text" disabled value={profile.user?.name || ''} className="w-full px-4 py-2 rounded-lg border border-border bg-secondary focus:ring-0 transition-all opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <input type="email" disabled value={profile.user?.email || ''} className="w-full px-4 py-2 rounded-lg border border-border bg-secondary focus:ring-0 transition-all opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <input type="tel" value={profile.phone || ''} onChange={e => handleChange(null, 'phone', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Date of Birth</label>
                    <input type="date" value={profile.dob || ''} onChange={e => handleChange(null, 'dob', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Gender</label>
                    <select value={profile.gender || ''} onChange={e => handleChange(null, 'gender', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all">
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 pt-4">
                  <label className="text-sm font-medium text-foreground">Current Address</label>
                  <textarea value={profile.currentAddress || ''} onChange={e => handleChange(null, 'currentAddress', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all h-24"></textarea>
                </div>
                
                <div className="space-y-2 pt-2">
                  <label className="text-sm font-medium text-foreground">Permanent Address</label>
                  <textarea value={profile.permanentAddress || ''} onChange={e => handleChange(null, 'permanentAddress', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all h-24"></textarea>
                </div>
              </div>
            )}

            {activeTab === 'academic' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold border-b border-border pb-4">Academic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">College / University</label>
                    <input type="text" value={profile.academic?.college || ''} onChange={e => handleChange('academic', 'college', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Degree</label>
                    <input type="text" value={profile.academic?.degree || ''} onChange={e => handleChange('academic', 'degree', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Branch / Specialization</label>
                    <input type="text" value={profile.academic?.branch || ''} onChange={e => handleChange('academic', 'branch', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Passing Year</label>
                    <input type="number" value={profile.academic?.passingYear || ''} onChange={e => handleChange('academic', 'passingYear', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current CGPA</label>
                    <input type="number" step="0.01" value={profile.academic?.cgpa || ''} onChange={e => handleChange('academic', 'cgpa', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">12th Percentage</label>
                    <input type="number" step="0.01" value={profile.academic?.twelfthPercent || ''} onChange={e => handleChange('academic', 'twelfthPercent', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Skills</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills?.length > 0 ? profile.skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium flex items-center gap-2">
                          {skill}
                        </span>
                      )) : <p className="text-muted-foreground text-sm">Add skills separated by commas below to save</p>}
                    </div>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        className="flex-1 px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" 
                        placeholder="Comma separated skills (e.g., React, Python)" 
                        onChange={e => handleChange(null, 'skills', e.target.value.split(',').map(s => s.trim()).filter(s => s))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-8 animate-fade-in">
                <div>
                  <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">LinkedIn Profile</label>
                      <input type="url" value={profile.links?.linkedin || ''} onChange={e => handleChange('links', 'linkedin', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">GitHub Profile</label>
                      <input type="url" value={profile.links?.github || ''} onChange={e => handleChange('links', 'github', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-foreground">Personal Portfolio / Website</label>
                      <input type="url" value={profile.links?.portfolio || ''} onChange={e => handleChange('links', 'portfolio', e.target.value)} className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold border-b border-border pb-4 mb-6">Upload Resume</h3>
                  
                  <div className="mt-6 mb-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Current Resume</h4>
                    {profile.uploads?.resume ? (
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                            <FileText size={20} />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-foreground">Resume Attached</p>
                            <a href={profile.uploads.resume} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">View File</a>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No resume uploaded yet.</p>
                    )}
                  </div>

                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-secondary/20 hover:bg-secondary/40 transition-colors relative">
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleResumeUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                      <Upload size={28} />
                    </div>
                    <p className="font-medium text-foreground mb-1">
                      {uploadingResume ? 'Uploading...' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">PDF, DOCX up to 5MB</p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fade-in p-8 text-center text-muted-foreground border-2 border-dashed border-border rounded-xl">
                Projects and Experience section can be managed via API array updates. Add UI forms here as needed.
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfilePage;
