/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle, ChevronRight, Building } from 'lucide-react';
import api from '../../services/api';

const ApplicationTrackingPage = () => {
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

  const getStages = (status) => {
    const allStages = ['Applied', 'Online Assessment', 'Shortlisted', 'Interview', 'Selected'];
    const currentIdx = allStages.indexOf(status) !== -1 ? allStages.indexOf(status) : (status === 'Rejected' ? 2 : 0);
    
    return allStages.map((stageName, index) => {
      let isCompleted = index < currentIdx;
      let isCurrent = index === currentIdx && status !== 'Rejected';
      let isError = status === 'Rejected' && index === currentIdx;

      // If selected, all are completed
      if (status === 'Selected') {
        isCompleted = true;
        isCurrent = false;
      }
      
      // If rejected, override current stage to Rejected
      let displayName = stageName;
      if (isError) displayName = 'Rejected';

      return {
        name: displayName,
        date: isCompleted || isCurrent || isError ? 'Updated' : 'TBD',
        completed: isCompleted,
        current: isCurrent,
        error: isError
      };
    });
  };

  if (loading) return <div className="text-center p-12 text-muted-foreground">Loading applications...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Application Tracking</h1>
        <p className="text-muted-foreground mt-1">Track the status of all your job applications.</p>
      </div>

      {error && <div className="text-destructive font-medium">{error}</div>}

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm text-center">
          <div className="text-2xl font-bold">{applications.length}</div>
          <div className="text-sm text-muted-foreground">Total Applied</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm text-center">
          <div className="text-2xl font-bold text-amber-500">
            {applications.filter(a => ['Shortlisted', 'Interview', 'Selected'].includes(a.status)).length}
          </div>
          <div className="text-sm text-muted-foreground">Shortlisted</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-500">
            {applications.filter(a => a.status === 'Interview').length}
          </div>
          <div className="text-sm text-muted-foreground">Interviews</div>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border shadow-sm text-center">
          <div className="text-2xl font-bold text-green-500">
            {applications.filter(a => a.status === 'Selected').length}
          </div>
          <div className="text-sm text-muted-foreground">Offers</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="space-y-6 mt-8">
        {applications.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            You haven't applied to any jobs yet.
          </div>
        ) : (
          applications.map((app) => {
            const stages = getStages(app.status);
            
            return (
              <div key={app._id} className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                      <Building size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{app.job?.title || 'Unknown Role'}</h3>
                      <p className="text-muted-foreground">{app.job?.company || 'Unknown Company'} • Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {app.status === 'Rejected' && (
                      <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-sm font-medium flex items-center gap-1.5">
                        <XCircle size={14} /> Rejected
                      </span>
                    )}
                    {app.status === 'Interview' && (
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium flex items-center gap-1.5">
                        <Clock size={14} /> Interview Scheduled
                      </span>
                    )}
                    {app.status === 'Shortlisted' && (
                      <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-sm font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Shortlisted
                      </span>
                    )}
                    {app.status === 'Selected' && (
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Selected
                      </span>
                    )}
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative overflow-x-auto pb-4">
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary -translate-y-1/2 z-0 hidden md:block"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-0 relative z-10 min-w-[600px]">
                    {stages.map((stage, index) => (
                      <div key={index} className="flex md:flex-col items-center md:justify-center gap-3 md:gap-2 w-full md:w-32 group">
                        {/* Line for mobile */}
                        {index !== stages.length - 1 && (
                          <div className="absolute left-[11px] top-8 bottom-[-24px] w-0.5 bg-secondary md:hidden z-[-1]"></div>
                        )}
                        
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 bg-card transition-colors ${
                          stage.error ? 'border-destructive text-destructive' :
                          stage.completed ? 'border-primary bg-primary text-primary-foreground' : 
                          stage.current ? 'border-primary text-primary bg-primary/10' : 
                          'border-muted bg-secondary text-muted-foreground'
                        }`}>
                          {stage.error ? <XCircle size={14} /> : 
                          stage.completed ? <CheckCircle2 size={14} /> : 
                          <div className={`w-2 h-2 rounded-full ${stage.current ? 'bg-primary' : 'bg-muted'}`}></div>}
                        </div>
                        
                        <div className="md:text-center flex-1 md:flex-none">
                          <p className={`text-sm font-medium ${stage.current || stage.completed || stage.error ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {stage.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{stage.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ApplicationTrackingPage;
