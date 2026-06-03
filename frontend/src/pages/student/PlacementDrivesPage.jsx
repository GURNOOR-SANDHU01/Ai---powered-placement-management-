/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Users, Building, Info, FileText } from 'lucide-react';
import api from '../../services/api';

const PlacementDrivesPage = () => {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/placement-drives');
      setDrives(data);
    } catch (err) {
      setError('Failed to fetch placement drives');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center p-12 text-muted-foreground">Loading drives...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Placement Drives</h1>
        <p className="text-muted-foreground mt-1">Discover and register for upcoming campus recruitment drives.</p>
      </div>

      {error && <div className="text-destructive font-medium">{error}</div>}

      <div className="grid grid-cols-1 gap-6">
        {drives.length === 0 ? (
          <div className="text-center p-12 text-muted-foreground border-2 border-dashed border-border rounded-xl">
            No active placement drives found.
          </div>
        ) : drives.map((drive) => {
          const daysLeft = Math.ceil((new Date(drive.registrationDeadline) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={drive._id} className="rounded-2xl bg-card border border-border shadow-sm overflow-hidden">
              <div className={`h-2 ${
                drive.status === 'Registration Open' ? 'bg-green-500' :
                drive.status === 'In Progress' ? 'bg-amber-500' : 'bg-primary'
              }`}></div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border border-border">
                        <Building size={32} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">{drive.companyName}</h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-medium px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                            {drive.status}
                          </span>
                          {daysLeft > 0 && drive.status === 'Registration Open' && (
                            <span className="text-sm text-destructive font-medium flex items-center gap-1">
                              <CalendarIcon size={14} /> Ends in {daysLeft} days
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
                        <FileText className="text-primary shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="font-semibold text-sm">Roles Offered</p>
                          <p className="text-sm text-muted-foreground mt-1">{drive.rolesOffered?.join(', ')}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
                        <Users className="text-primary shrink-0 mt-0.5" size={20} />
                        <div>
                          <p className="font-semibold text-sm">Eligibility Criteria</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Min CGPA: {drive.eligibility?.minCgpa} • {drive.eligibility?.branches?.length > 0 ? drive.eligibility.branches.join(', ') : 'All Branches'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-64 shrink-0 bg-secondary/30 p-6 rounded-xl border border-border flex flex-col justify-center text-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">CTC Offered</p>
                      <p className="text-3xl font-bold text-primary">{drive.ctcOffered}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium mb-1">Drive Date</p>
                      <p className="font-semibold">{new Date(drive.driveDate).toLocaleDateString()}</p>
                    </div>
                    <button 
                      className="w-full py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                      disabled={drive.status !== 'Registration Open'}
                    >
                      {drive.status === 'Registration Open' ? 'Register Now' : 'View Details'}
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex items-start gap-2">
                  <Info size={16} className="text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    The hiring process involves an Online Assessment followed by Technical and HR interviews. Ensure your profile and resume are updated before registering.
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlacementDrivesPage;
