/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { 
  FileText, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  XCircle,
  TrendingUp,
  Award
} from 'lucide-react';
import api from '../../services/api';

const ResumeAnalysisPage = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!resumeText) {
      setError('Please provide resume text to analyze.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const { data } = await api.post('/ai/analyze-resume', { 
        resumeText, 
        jobDescription 
      });
      setAnalysis(data);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Resume Analysis</h1>
          <p className="text-muted-foreground mt-1">Paste your resume and target job description to get instant ATS feedback.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Resume Text (Paste content here)</label>
          <textarea 
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all h-48"
            placeholder="Paste the text content of your resume here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          ></textarea>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Target Job Description (Optional)</label>
          <textarea 
            className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all h-48"
            placeholder="Paste the job description you are targeting..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      
      {error && <div className="text-destructive text-sm font-medium">{error}</div>}

      <button 
        onClick={handleAnalyze}
        disabled={loading}
        className="flex items-center justify-center gap-2 py-3 px-6 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 mx-auto w-full md:w-auto min-w-[200px]"
      >
        <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        {loading ? 'Analyzing with AI...' : 'Analyze Resume'}
      </button>

      {analysis && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in pt-6 border-t border-border mt-8">
          {/* Scores Overview */}
          <div className="md:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm text-center">
              <div className="relative inline-flex items-center justify-center mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-secondary" />
                  <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-primary" strokeDasharray="377" strokeDashoffset={377 - (377 * (analysis.atsScore || 0)) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-bold">{analysis.atsScore || 0}</span>
                  <span className="text-xs text-muted-foreground">/100</span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-1">ATS Score</h3>
              <p className="text-muted-foreground text-sm">
                {analysis.atsScore > 80 ? "Your resume looks fantastic!" : analysis.atsScore > 50 ? "Your resume is okay, but needs work." : "Your resume needs significant improvement."}
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 shadow-sm flex flex-col items-start gap-4">
              <div className="p-3 bg-primary/20 rounded-full text-primary">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">AI Feedback Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {analysis.feedback}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <TrendingUp className="text-primary" />
                <h2 className="text-xl font-bold">Formatting & Structure</h2>
              </div>
              
              <div className="space-y-4">
                <div className={`flex gap-4 p-4 rounded-xl border ${analysis.formatting === 'Good' ? 'bg-green-500/10 border-green-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                  {analysis.formatting === 'Good' ? (
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-semibold text-foreground">Formatting Analysis</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {analysis.formatting}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
                <Award className="text-primary" />
                <h2 className="text-xl font-bold">Missing Skills Analysis</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Based on the job description, these skills are missing from your resume:
              </p>
              
              {analysis.missingSkills && analysis.missingSkills.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {analysis.missingSkills.map((skill, idx) => (
                    <div key={idx} className="px-4 py-3 rounded-lg border border-border bg-secondary/50 text-center flex flex-col items-center justify-center gap-1">
                      <span className="font-medium text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-foreground">Great Match!</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      You have all the key skills mentioned in the job description!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalysisPage;
