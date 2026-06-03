/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState, useEffect } from 'react';
import { FileText, Download, BarChart2, PieChart, TrendingUp, Building, Loader2 } from 'lucide-react';
import api from '../../services/api';

const ReportsPage = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/placement-drives/reports');
      setReportData(data);
    } catch (err) {
      setError('Failed to fetch reports');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  if (error) return <div className="text-destructive p-4 bg-destructive/10 rounded-lg">{error}</div>;

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">Generate and export comprehensive placement reports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Branch Wise Report */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
            <PieChart size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Branch Wise Report</h3>
          <p className="text-sm text-muted-foreground mb-6 flex-1">
            Detailed breakdown of placement statistics, average packages, and highest offers categorized by academic branches.
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-secondary/50 rounded-lg max-h-48 overflow-y-auto">
              {reportData && Object.entries(reportData.branchStats || {}).length > 0 ? (
                Object.entries(reportData.branchStats).map(([branch, count]) => (
                  <div key={branch} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                    <span>{branch}</span>
                    <span className="font-bold">{count} Students</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground text-center">No data available</div>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Print PDF
              </button>
            </div>
          </div>
        </div>

        {/* Company Wise Report */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4">
            <Building size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Company Wise Report</h3>
          <p className="text-sm text-muted-foreground mb-6 flex-1">
            Analyze recruiting patterns, number of offers rolled out, and packages offered by individual partner companies.
          </p>
          <div className="space-y-3">
            <div className="p-4 bg-secondary/50 rounded-lg max-h-48 overflow-y-auto">
              {reportData && Object.entries(reportData.companyStats || {}).length > 0 ? (
                Object.entries(reportData.companyStats).map(([company, count]) => (
                  <div key={company} className="flex justify-between text-sm py-1 border-b border-border last:border-0">
                    <span>{company}</span>
                    <span className="font-bold">{count} Offers</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted-foreground text-center">No data available</div>
              )}
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Print PDF
              </button>
            </div>
          </div>
        </div>

        {/* Overall Placement Report */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 flex flex-col h-full hover:border-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2">Overall Year Report</h3>
          <p className="text-sm text-muted-foreground mb-6 flex-1">
            Comprehensive annual report covering all placement metrics, trends compared to previous years, and total placement percentage.
          </p>
          <div className="space-y-3">
             <div className="p-4 bg-secondary/50 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Students Registered</span>
                <span className="font-bold">{reportData?.totalStudents || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Placed Students</span>
                <span className="font-bold">{reportData?.totalPlaced || 0}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-border">
                <span className="font-medium">Placement Rate</span>
                <span className="font-bold text-green-600">{reportData?.placementRate || 0}%</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Print PDF
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <BarChart2 size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Custom Report Generation</h3>
            <p className="text-sm text-muted-foreground">Need specific data points? Use our advanced query builder to create custom reports.</p>
          </div>
        </div>
        <button className="bg-background border border-primary text-primary px-6 py-2.5 rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all shrink-0">
          Create Custom Report
        </button>
      </div>

    </div>
  );
};

export default ReportsPage;
