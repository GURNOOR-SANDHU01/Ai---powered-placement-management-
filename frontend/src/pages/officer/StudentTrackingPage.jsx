/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { Search, Filter, Download, ExternalLink, ShieldCheck, Mail, BookOpen, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const StudentTrackingPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/student/all');
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student => 
    student.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.academic?.branch?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Student Tracking</h1>
          <p className="text-muted-foreground mt-1">Monitor student placement progress and verify details.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2 shadow-sm">
            <Download size={18} /> Export Data
          </button>
        </div>
      </div>

      {error && <div className="text-destructive p-4 bg-destructive/10 rounded-lg">{error}</div>}

      <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4 bg-secondary/30">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, email, or branch..." 
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary">
              <option>All Branches</option>
              <option>Computer Science</option>
              <option>Information Tech</option>
              <option>Electronics</option>
            </select>
            <select className="px-3 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-secondary transition-colors focus:ring-2 focus:ring-primary">
              <option>Status: All</option>
              <option>Unplaced</option>
              <option>Placed</option>
            </select>
          </div>
        </div>

        {/* Students Table */}
        <div className="overflow-x-auto">
          {loading ? (
             <div className="flex justify-center items-center py-12 text-muted-foreground">
               <Loader2 className="animate-spin mr-2" /> Loading students...
             </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-card">
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Student Name</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Academic Info</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground">Status</th>
                  <th className="p-4 text-sm font-semibold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-8 text-muted-foreground">No students found.</td>
                  </tr>
                ) : filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-secondary/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0 border border-primary/20">
                          {student.user?.name?.[0] || 'S'}
                        </div>
                        <div>
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {student.user?.name || 'Unnamed'}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                            <Mail size={10} /> {student.user?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 font-medium text-sm">
                        <BookOpen size={14} className="text-muted-foreground" /> {student.academic?.branch || 'N/A'}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        CGPA: {student.academic?.cgpa || 'N/A'} • Batch: {student.academic?.passingYear || 'N/A'}
                      </p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        student.placementStatus === 'Unplaced' ? 'bg-secondary text-muted-foreground border-border' :
                        student.placementStatus === 'Placed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }`}>
                        {student.placementStatus || 'Unplaced'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {student.uploads?.resume && (
                          <a href={student.uploads.resume} target="_blank" rel="noopener noreferrer" className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all" title="View Resume">
                            <ExternalLink size={18} />
                          </a>
                        )}
                        <button className="p-2 text-muted-foreground hover:text-green-600 hover:bg-green-500/10 rounded-lg transition-all" title="Verify Documents">
                          <ShieldCheck size={18} />
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
          <span>Showing {filteredStudents.length} entries</span>
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

export default StudentTrackingPage;
