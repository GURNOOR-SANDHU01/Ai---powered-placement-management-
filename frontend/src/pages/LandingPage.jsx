/*
  @author Gurnoor SINGH (102316101) 
*/
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  ArrowRight, 
  Bot, 
  Briefcase, 
  BarChart, 
  Users, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Nav */}
      <header className="fixed w-full top-0 z-50 glass">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/30">
              C
            </div>
            <span className="font-bold text-xl tracking-tight">CampusConnect</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-full hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-1/2 -right-1/4 w-[1000px] h-[1000px] rounded-full bg-primary/5 blur-3xl opacity-50" />
            <div className="absolute -bottom-1/2 -left-1/4 w-[800px] h-[800px] rounded-full bg-accent/20 blur-3xl opacity-50" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-primary"></span>
              AI-Powered Placement Platform
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Get Placed <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Smarter</span> with AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Connect with top recruiters, optimize your resume with AI, and prepare for interviews through intelligent mock sessions. The ultimate platform for campus placements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/register" className="h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium flex items-center justify-center gap-2 hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30 w-full sm:w-auto">
                Start Your Journey
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="h-12 px-8 rounded-full bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-all w-full sm:w-auto">
                Sign In
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Supercharge Your Placements</h2>
              <p className="text-muted-foreground">Everything you need to streamline the hiring process from both ends.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Bot size={24} className="text-primary" />, title: "AI Resume Analysis", desc: "Get real-time ATS scoring and personalized feedback to improve your resume." },
                { icon: <Briefcase size={24} className="text-primary" />, title: "Job Recommendations", desc: "Smart algorithms match your profile with the perfect job opportunities." },
                { icon: <BarChart size={24} className="text-primary" />, title: "Placement Tracking", desc: "Keep track of all your applications, interview schedules, and offers in one place." },
                { icon: <Users size={24} className="text-primary" />, title: "Recruiter Portal", desc: "Dedicated tools for companies to manage drives, filter candidates, and hire top talent." },
              ].map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
              <div className="py-6 md:py-0">
                <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
                <div className="text-primary-foreground/80 font-medium">Students Placed</div>
              </div>
              <div className="py-6 md:py-0">
                <div className="text-4xl md:text-5xl font-bold mb-2">300+</div>
                <div className="text-primary-foreground/80 font-medium">Partner Companies</div>
              </div>
              <div className="py-6 md:py-0">
                <div className="text-4xl md:text-5xl font-bold mb-2">90%</div>
                <div className="text-primary-foreground/80 font-medium">Placement Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by Students</h2>
              <p className="text-muted-foreground">Hear what successful candidates have to say about our platform.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Rahul S.", role: "SDE at Amazon", content: "The AI resume analysis was a game-changer. It helped me tailor my resume and I got shortlisted for my dream company!" },
                { name: "Priya M.", role: "Analyst at Google", content: "I love the mock interview feature. Getting AI feedback on my answers boosted my confidence significantly before the actual rounds." },
                { name: "Amit K.", role: "Developer at Microsoft", content: "Tracking multiple placement drives used to be chaotic. CampusConnect made it so organized and stress-free." },
              ].map((testimonial, i) => (
                <div key={i} className="p-8 rounded-2xl bg-secondary/50 border border-border relative">
                  <div className="flex gap-1 mb-4 text-amber-500">
                    {[1,2,3,4,5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
