/*
  @author Gurnoor SINGH (102316101) 
*/
import { FileText, Download, BarChart2, PieChart, TrendingUp, Building } from 'lucide-react';

const ReportsPage = () => {
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
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
              <FileText size={18} /> View Online
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Excel
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
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary/10 text-primary font-medium rounded-lg hover:bg-primary hover:text-primary-foreground transition-all">
              <FileText size={18} /> View Online
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Excel
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
            <button className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm">
              <FileText size={18} /> View Online
            </button>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-secondary/80 transition-all border border-border text-sm">
                <Download size={16} /> Excel
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
