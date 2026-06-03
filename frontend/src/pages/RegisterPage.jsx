/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, UserPlus } from 'lucide-react';
import api from '../services/api';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }
    
    setError('');
    setLoading(true);

    try {
      // API expects role to be 'Student', 'Recruiter', etc. (capitalized)
      const formattedRole = formData.role === 'student' ? 'Student' : 'Recruiter';
      const { data } = await api.post('/auth/register', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password, 
        role: formattedRole 
      });
      
      localStorage.setItem('userInfo', JSON.stringify(data));
      
      if (data.role === 'Student') navigate('/student');
      else if (data.role === 'Recruiter') navigate('/recruiter');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30 px-4 py-12">
      <div className="max-w-md w-full space-y-8 p-10 bg-card rounded-2xl shadow-xl border border-border">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl mx-auto mb-4">
            C
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
          <p className="text-muted-foreground mt-2">Join CampusConnect and start your journey</p>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg border border-destructive/20 text-center font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
              formData.role === 'student' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'
            }`}>
              <input type="radio" name="role" value="student" className="hidden" checked={formData.role === 'student'} onChange={handleChange} />
              <User size={24} />
              <span className="font-medium text-sm">Student</span>
            </label>
            <label className={`cursor-pointer border rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition-all ${
              formData.role === 'recruiter' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-muted-foreground hover:bg-secondary'
            }`}>
              <input type="radio" name="role" value="recruiter" className="hidden" checked={formData.role === 'recruiter'} onChange={handleChange} />
              <Briefcase size={24} />
              <span className="font-medium text-sm">Recruiter</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                name="name"
                required
                className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="email"
                name="email"
                required
                className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="password"
                name="password"
                required
                className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
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
                name="confirmPassword"
                required
                className="block w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <UserPlus size={18} />
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
