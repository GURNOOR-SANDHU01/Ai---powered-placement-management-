/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Star, 
  CheckCircle, 
  XCircle, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Award,
  Briefcase,
  Loader2
} from 'lucide-react';
import api from '../../services/api';

const CandidateDetailsPage = () => {
  const { id } = useParams(); // Application ID
  
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [aiMatch, setAiMatch] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/applications/${id}`);
      setApplication(data);
      
      // Auto-trigger AI Match if not already stored
      if (!data.aiMatchScore) {
        generateAiMatch(data);
      }
    } catch (err) {
      setError('Failed to load candidate details');
    } finally {
      setLoading(false);
    }
  };

  const generateAiMatch = async (appData) => {
    try {
      setAnalyzing(true);
      const { data } = await api.post('/ai/match-candidate', {
        jobId: appData.job._id,
        candidateId: appData.student._id
      });
      setAiMatch(data);
      
      // We could also update the application in DB with this score if we want to cache it
    } catch (err) {
      console.error('Failed to generate AI match', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const updateStatus = async (status) => {
    try {
      await api.put(`/applications/${id}/status`, { status });
      setApplication({ ...application, status });
    } catch (err) {
      alert('Failed to update status');
    }
  };

  if (loading) {
    return <div className="p-12 flex justify-center text-muted-foreground"><Loader2 className="animate-spin mr-2" /> Loading profile...</div>;
  }

  if (error || !application) {
    return <div className="p-12 text-center text-destructive font-medium">{error || 'Application not found'}</div>;
  }

  const candidate = application.student;
  const job = application.job;
  
  // Try to parse StudentProfile data if populated in student, or just use basic user data
  // Assuming student contains basic User info. We'd ideally populate student's profile.
  // For MVP, we'll use what we have.

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link to="/recruiter/applications" className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Candidate Profile</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Reviewing application for {job?.title}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Summary & Actions */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center font-bold text-3xl text-primary border-4 border-card shadow-sm mx-auto mb-4 relative">
              {candidate?.name?.[0] || 'C'}
              {aiMatch && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full border-2 border-card flex items-center gap-1">
                  <Star size={10} className="fill-current" /> {aiMatch.matchScore}%
                </div>
              )}
            </div>
            <h2 className="text-xl font-bold">{candidate?.name}</h2>
            <p className="text-muted-foreground text-sm mt-1">{candidate?.email}</p>
            <span className={`inline-block mt-3 px-2.5 py-1 rounded-full text-xs font-medium border ${
                application.status === 'Applied' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                application.status === 'Shortlisted' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                application.status === 'Interview' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                Current Status: {application.status}
            </span>
            
            <div className="mt-6 space-y-3">
              <button onClick={() => updateStatus('Shortlisted')} className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                <CheckCircle size={18} /> Shortlist Candidate
              </button>
              <button onClick={() => updateStatus('Interview')} className="w-full flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 text-amber-600 font-medium rounded-lg hover:bg-amber-500/20 transition-colors">
                <Calendar size={18} /> Schedule Interview
              </button>
              <button onClick={() => updateStatus('Rejected')} className="w-full flex items-center justify-center gap-2 py-2.5 bg-secondary text-destructive font-medium rounded-lg hover:bg-destructive/10 transition-colors">
                <XCircle size={18} /> Reject Application
              </button>
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
              <Download size={20} />
            </div>
            <h3 className="font-bold mb-1">Resume Attached</h3>
            {application.resumeUrl ? (
              <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-primary hover:underline">View PDF</a>
            ) : (
              <p className="text-sm text-muted-foreground">No resume attached</p>
            )}
          </div>
        </div>

        {/* Right Column: Detailed Profile */}
        <div className="md:col-span-2 space-y-6">
          
          {/* AI Match Analysis */}
          <div className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl border border-primary/20 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-primary" size={24} />
              <h3 className="font-bold text-lg">AI Match Analysis</h3>
            </div>
            
            {analyzing ? (
              <div className="flex flex-col items-center justify-center py-6">
                <Loader2 className="animate-spin text-primary mb-2" size={32} />
                <p className="text-muted-foreground text-sm">Analyzing candidate profile against job requirements...</p>
              </div>
            ) : aiMatch ? (
              <>
                <p className="text-sm text-foreground mb-6 leading-relaxed">
                  {aiMatch.summary}
                </p>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-xl border border-border">
                    <h4 className="font-semibold text-sm mb-2 text-green-600 flex items-center gap-2"><CheckCircle size={16}/> Strengths</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {aiMatch.strengths?.map((str, idx) => <li key={idx}>{str}</li>)}
                    </ul>
                  </div>
                  
                  {aiMatch.weaknesses?.length > 0 && (
                    <div className="bg-card p-4 rounded-xl border border-border">
                      <h4 className="font-semibold text-sm mb-2 text-amber-600 flex items-center gap-2"><Star size={16}/> Areas for Improvement / Missing Skills</h4>
                      <ul className="list-disc pl-5 text-sm space-y-1">
                        {aiMatch.weaknesses.map((weak, idx) => <li key={idx}>{weak}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <button onClick={() => generateAiMatch(application)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                  Generate AI Match Report
                </button>
              </div>
            )}
          </div>
          
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 md:p-8 text-center text-muted-foreground">
            More candidate profile details (Academics, Experience) can be integrated here via StudentProfile API expansion.
          </div>

        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsPage;
