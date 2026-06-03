/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, KeyRound, ArrowRight } from 'lucide-react';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit logic
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <KeyRound size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Set new password</h2>
          <p className="text-muted-foreground mt-2">
            Your new password must be different from previous used passwords.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">New Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
            >
              Reset Password
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
