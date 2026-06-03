/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Clock, Link as LinkIcon, Video, CheckCircle, XCircle, Loader2, Check } from 'lucide-react';
import api from '../../services/api';

const InterviewManagementPage = () => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/interviews');
      setInterviews(data);
    } catch (err) {
      setError('Failed to fetch interviews');
    } finally {
      setLoading(false);
    }
  };

  const updateInterviewResult = async (id, result) => {
    try {
      await api.put(`/interviews/${id}`, { status: 'Completed', result });
      setInterviews(interviews.map(inv => inv._id === id ? { ...inv, status: 'Completed', result } : inv));
    } catch (err) {
      alert('Failed to update interview result');
    }
  };

  const scheduledInterviews = interviews.filter(i => i.status === 'Scheduled');
  const completedInterviews = interviews.filter(i => i.status === 'Completed');

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Interviews</h1>
          <p className="text-muted-foreground mt-1">Manage and track candidate interviews.</p>
        </div>
      </div>

      {error && <div className="text-destructive p-4 bg-destructive/10 rounded-lg">{error}</div>}

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        
        {/* Tabs */}
        <div className="flex border-b border-border">
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'Scheduled' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-secondary'}`}
            onClick={() => setActiveTab('Scheduled')}
          >
            Scheduled Interviews ({scheduledInterviews.length})
          </button>
          <button 
            className={`flex-1 py-4 text-center font-medium transition-colors ${activeTab === 'Completed' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-secondary'}`}
            onClick={() => setActiveTab('Completed')}
          >
            Completed ({completedInterviews.length})
          </button>
        </div>

        <div className="p-6">
          {loading ? (
             <div className="flex justify-center items-center py-12 text-muted-foreground">
               <Loader2 className="animate-spin mr-2" /> Loading interviews...
             </div>
          ) : (
            <>
              {activeTab === 'Scheduled' && (
                <div className="space-y-4">
                  {scheduledInterviews.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground border-2 border-dashed border-border rounded-xl">No scheduled interviews.</div>
                  ) : scheduledInterviews.map((interview) => (
                    <div key={interview._id} className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                          {interview.candidate?.name?.[0] || 'C'}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{interview.candidate?.name}</h3>
                          <p className="text-sm text-muted-foreground">Applying for: {interview.application?.job?.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <CalendarIcon size={16} className="text-muted-foreground" /> {new Date(interview.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-foreground">
                            <Clock size={16} className="text-muted-foreground" /> {interview.time}
                          </div>
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-background border border-border text-xs font-medium uppercase tracking-wider">
                          {interview.type} Round
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        {interview.meetingLink && (
                          <a href={interview.meetingLink.startsWith('http') ? interview.meetingLink : `https://${interview.meetingLink}`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-primary-foreground font-medium rounded-lg text-sm hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <Video size={16} /> Join
                          </a>
                        )}
                        <div className="flex gap-1 border border-border rounded-lg overflow-hidden bg-background">
                          <button onClick={() => updateInterviewResult(interview._id, 'Passed')} className="px-3 py-2 text-green-600 hover:bg-green-500/10 transition-colors" title="Mark Passed"><Check size={16}/></button>
                          <div className="w-px bg-border"></div>
                          <button onClick={() => updateInterviewResult(interview._id, 'Failed')} className="px-3 py-2 text-destructive hover:bg-destructive/10 transition-colors" title="Mark Failed"><XCircle size={16}/></button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Completed' && (
                <div className="space-y-4">
                  {completedInterviews.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground border-2 border-dashed border-border rounded-xl">No completed interviews yet.</div>
                  ) : completedInterviews.map((interview) => (
                    <div key={interview._id} className="p-5 rounded-xl border border-border bg-secondary/30 flex flex-col md:flex-row md:items-center justify-between gap-4 opacity-75 hover:opacity-100 transition-opacity">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground shrink-0">
                          {interview.candidate?.name?.[0] || 'C'}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground">{interview.candidate?.name}</h3>
                          <p className="text-sm text-muted-foreground">Applying for: {interview.application?.job?.title}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <div className="text-sm text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString()}
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-background border border-border text-xs font-medium uppercase tracking-wider">
                          {interview.type} Round
                        </div>
                      </div>
                      
                      <div>
                        {interview.result === 'Passed' ? (
                          <span className="flex items-center gap-1.5 text-green-600 font-medium text-sm px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">
                            <CheckCircle size={16} /> Passed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-destructive font-medium text-sm px-3 py-1 bg-destructive/10 rounded-full border border-destructive/20">
                            <XCircle size={16} /> Failed
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewManagementPage;
