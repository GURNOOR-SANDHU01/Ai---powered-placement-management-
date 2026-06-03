/*
  @author Gurnoor SINGH (102316101) 
*/
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Search, 
  BarChart3,
  LogOut,
  Bell
} from 'lucide-react';

const PlacementOfficerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/officer', icon: <LayoutDashboard size={20} /> },
    { name: 'Create Drive', path: '/officer/create-drive', icon: <PlusCircle size={20} /> },
    { name: 'Student Tracking', path: '/officer/student-tracking', icon: <Search size={20} /> },
    { name: 'Reports', path: '/officer/reports', icon: <BarChart3 size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <Link to="/officer" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
              C
            </div>
            <span className="font-bold text-xl tracking-tight">Admin Portal</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-border">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0 z-10 glass">
          <div className="flex items-center md:hidden">
            <span className="font-bold text-lg">Admin Portal</span>
          </div>
          
          <div className="ml-auto flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-secondary text-muted-foreground transition-colors relative">
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden flex items-center justify-center font-bold text-muted-foreground">
                P
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-foreground leading-none">Placement Cell</p>
                <p className="text-muted-foreground text-xs mt-1">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PlacementOfficerLayout;
