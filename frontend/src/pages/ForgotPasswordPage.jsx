/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy submit logic
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
            <Mail size={24} />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Forgot Password</h2>
          <p className="text-muted-foreground mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {!isSubmitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all"
              >
                <Send size={18} />
                Send Reset Link
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-8 text-center bg-secondary/50 p-4 rounded-lg border border-border">
            <p className="text-foreground font-medium mb-2">Check your email</p>
            <p className="text-sm text-muted-foreground">
              We've sent a password reset link to <strong>{email}</strong>.
            </p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
